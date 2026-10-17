
CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, name TEXT, role TEXT DEFAULT 'staff', created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE patients (id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT, phone TEXT, date_of_birth DATE, gender TEXT, blood_type TEXT, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE staff (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), name TEXT NOT NULL, role TEXT NOT NULL, specialization TEXT, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE appointments (id SERIAL PRIMARY KEY, patient_id INT REFERENCES patients(id) ON DELETE CASCADE, staff_id INT REFERENCES staff(id), date_time TIMESTAMP NOT NULL, status TEXT DEFAULT 'scheduled', notes TEXT, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE prescriptions (id SERIAL PRIMARY KEY, patient_id INT REFERENCES patients(id), staff_id INT REFERENCES staff(id), medication TEXT, dosage TEXT, duration TEXT, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE medical_records (id SERIAL PRIMARY KEY, patient_id INT REFERENCES patients(id) ON DELETE CASCADE, staff_id INT REFERENCES staff(id), diagnosis TEXT, treatment TEXT, created_at TIMESTAMP DEFAULT NOW());
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_staff ON appointments(staff_id);
