import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import mainAxios from "./api";

export type OfflineAction<T> =
  | { type: "add"; data: T; apiUrl: string }
  | { type: "update"; data: T & { _id: string; updatedAt: string }; apiUrl: string }
  | { type: "delete"; id: string; apiUrl: string };

function getQueueKey(resource: string) {
  return `offline_queue_${resource}`;
}

export async function addToQueue<T>(resource: string, action: OfflineAction<T>) {
  const queueStr = await AsyncStorage.getItem(getQueueKey(resource));
  const queue = queueStr ? JSON.parse(queueStr) : [];
  queue.push(action);
  await AsyncStorage.setItem(getQueueKey(resource), JSON.stringify(queue));
}

export async function flushQueue<T>(resource: string, showToast: (msg: string) => void) {
  const queueStr = await AsyncStorage.getItem(getQueueKey(resource));
  if (!queueStr) return;

  const queue: OfflineAction<T>[] = JSON.parse(queueStr);
  for (const action of queue) {
    try {
      if (action.type === "add") {
        await mainAxios.post(action.apiUrl, action.data);
      } else if (action.type === "update") {
        const server = await mainAxios.get(`${action.apiUrl}/${action.data._id}`);
        if (new Date(server.data.updatedAt) > new Date(action.data.updatedAt)) {
          showToast("⚠️ Your edit was overwritten");
        } else {
          await mainAxios.put(`${action.apiUrl}/${action.data._id}`, action.data);
        }
      } else if (action.type === "delete") {
        await mainAxios.delete(`${action.apiUrl}/${action.id}`);
      }
    } catch (err) {
      console.log("Flush failed, keep in queue", err);
      return;
    }
  }

  // clear queue after success
  await AsyncStorage.removeItem(getQueueKey(resource));
}

export function setupOfflineHandler<T>(resource: string, showToast: (msg: string) => void) {
  NetInfo.addEventListener(state => {
    if (state.isConnected) {
      flushQueue<T>(resource, showToast);
    }
  });
}