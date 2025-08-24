import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Lead, LeadStatus } from "../leadsType";
import { StatusPicker } from "./StatusPicker";
import { leadValidationSchema } from "./leadValidation";

interface LeadFormProps {
  onSubmit: (values: Omit<Lead, '_id' | 'updatedAt'>, editingId?: string) => void;
  initialValues?: Partial<Lead>;
  editingId?: string | null;
  onCancelEdit?: () => void;
  onCancelAddNew?: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, initialValues = {}, editingId, onCancelEdit, onCancelAddNew }) => {
  const [name, setName] = useState(initialValues.name || '');
  const [status, setStatus] = useState<Lead['status']>(initialValues.status || LeadStatus.NEW);
  const [company, setCompany] = useState(initialValues.company || '');
  const [phone, setPhone] = useState(initialValues.phone || '');
  const [email, setEmail] = useState(initialValues.email || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  

  const handleSubmit = () => {
    const values: Omit<Lead, '_id' | 'updatedAt'> = {
      name,
      status,
      company,
      phone,
      email,
    };

    leadValidationSchema
    .validate(values, { abortEarly: false })
    .then(() => {
      onSubmit(values, editingId || undefined);
      resetForm();
    })
    .catch((err) => {
      const errors: Record<string, string> = {};
      err.inner.forEach((e: any) => {
        if (e.path) errors[e.path] = e.message;
      });
      setErrors(errors);
    });
  };

  const resetForm = () => {
    setName('');
    setStatus(LeadStatus.NEW);
    setCompany('');
    setPhone('');
    setEmail('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingId ? 'Edit Lead' : 'New Lead'}
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={[styles.input, errors.name && styles.errorInput]}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <StatusPicker
        value={status}
        onChange={setStatus}
      />
      {errors.status && <Text style={styles.error}>{errors.status}</Text>}

      <TextInput
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
        style={styles.input}
      />

      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={[styles.input, errors.phone && styles.errorInput]}
        keyboardType="phone-pad"
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, errors.email && styles.errorInput]}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <View style={styles.buttonGroup}>
        <Button
          title={editingId ? "Update Lead" : "Add Lead"}
          onPress={handleSubmit}
        />
        {editingId && (
          <Button
            title="Cancel Edit"
            onPress={onCancelEdit}
            color="red"
          />
        )}
        {!editingId && (
          <Button
            title="Cancel add new lead"
            onPress={onCancelAddNew}
            color="red"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2, // shadow Android
    shadowColor: '#000', // shadow iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 13,
  },
  buttonGroup: {
    marginTop: 10,
    gap: 10,
  },
});

export default LeadForm;