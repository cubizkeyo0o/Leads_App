const ENV = {
  API_URL: `${process.env.EXPO_PUBLIC_API_URL}${process.env.KEYCRUDAPI}`,
};

if (typeof window !== "undefined") {
  (window as any).ENV = ENV;
}

export default ENV;