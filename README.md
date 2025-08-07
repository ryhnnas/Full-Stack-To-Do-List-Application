# 🚀 Aplikasi To-Do List Full-Stack

![image](https://github.com/user-attachments/assets/325c2555-cd0c-4cd9-b75f-b15b43bd7519)

Sebuah aplikasi To-Do List _full-stack_ yang sederhana namun tangguh, dibangun menggunakan **React.js** untuk _frontend_, **Node.js (Express.js)** untuk _backend_, dan **MySQL** (melalui XAMPP untuk pengembangan lokal) sebagai _database_. Proyek ini mendemonstrasikan konsep dasar pengembangan _full-stack_, termasuk pembuatan API, interaksi _database_, dan _rendering_ sisi klien.

---

## ✨ Fitur

* **Menambahkan Tugas:** Buat tugas baru dengan judul dan deskripsi.
* **Mengedit Tugas:** Perbarui detail tugas yang sudah ada.
* **Menghapus Tugas:** Hapus tugas yang tidak lagi dibutuhkan.
* **Menandai Selesai:** Tandai tugas sebagai selesai atau belum selesai.
* **Filter Tugas:** Saring daftar tugas berdasarkan status (Semua, Selesai, Belum Selesai).
* **Autentikasi Pengguna (Opsional):** Pendaftaran (_register_) dan _Login_ pengguna untuk manajemen tugas yang dipersonalisasi.

---

## 🛠️ Teknologi yang Digunakan

### Frontend

* **React.js:** _Library_ JavaScript untuk membangun antarmuka pengguna yang interaktif.
* **Vite:** _Tooling frontend_ generasi selanjutnya untuk pengembangan yang cepat.
* **Tailwind CSS:** _Framework_ CSS _utility-first_ untuk _styling_ yang cepat dan kustom.
* **Axios:** Klien HTTP berbasis _Promise_ untuk membuat permintaan ke API _backend_.

### Backend

* **Node.js:** Lingkungan _runtime_ JavaScript.
* **Express.js:** _Framework web_ minimalis dan fleksibel untuk Node.js.
* **MySQL2 (Node.js Driver):** Untuk berinteraksi dengan _database_ MySQL.
* **`dotenv`:** Untuk mengelola variabel lingkungan.
* **`cors`:** _Middleware_ Express.js untuk mengizinkan permintaan lintas _domain_ (CORS).
* **`bcryptjs` (Opsional):** Untuk _hashing password_ pengguna.
* **`jsonwebtoken` (Opsional):** Untuk implementasi JSON Web Tokens (JWT) dalam autentikasi.

### Database

* **MySQL / MariaDB:** Sistem manajemen _database_ relasional.
* **XAMPP:** Lingkungan pengembangan lokal yang menyediakan Apache, MySQL/MariaDB, PHP, dan Perl.

---

## ⚙️ Penyiapan dan Instalasi Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di mesin lokal Anda.

### Prasyarat

Pastikan Anda memiliki hal-hal berikut terinstal di sistem Anda:

* **Node.js & npm:** [https://nodejs.org/en/download/](https://nodejs.org/en/download/) (Direkomendasikan menggunakan [NVM for Windows](https://github.com/coreybutler/nvm-windows) atau [NVM for Linux/macOS](https://github.com/nvm-sh/nvm/))
* **XAMPP:** [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html)
* **Git** (Opsional, tapi direkomendasikan): [https://git-scm.com/downloads](https://git-scm.com/downloads)

## ⚙️ Penyiapan Database (MySQL via XAMPP)
# 1. Mulai Apache dan MySQL dari XAMPP Control Panel.
# 2. Buka browser dan navigasikan ke http://localhost/phpmyadmin.
# 3. Buat database baru bernama todo_app.
# 4. Klik pada database todo_app di sidebar.
# 5. Pergi ke tab SQL dan jalankan query berikut untuk membuat tabel tasks:

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    isCompleted BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId INT
);

# 6. Jika Anda mengimplementasikan autentikasi, jalankan juga query berikut untuk tabel users dan tambahkan foreign key ke tabel tasks:

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE
);

ALTER TABLE tasks
ADD CONSTRAINT fk_user
FOREIGN KEY (userId) REFERENCES users(id)
ON DELETE CASCADE;
