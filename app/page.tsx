"use client";
import React, { useState } from 'react';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [u, setU] = useState('');
  const [p, setP] = useState('');

  // ฟังก์ชันเช็ค Admin (User: admin / Pass: 12345678)
  const handleAdminLogin = () => {
    if (u === 'admin' && p === '12345678') {
      setIsAdmin(true);
    } else {
      alert('รหัสผ่านไม่ถูกต้องครับ');
    }
  };

  // --- หน้าจอสำหรับแอดมิน ---
  if (isAdmin) {
    return (
      {/* แถบเมนูไอคอนด้านบนสุด */}
<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '10px 20px', fontSize: '24px' }}>
  <span style={{ cursor: 'pointer' }}>👤</span>
  <span style={{ cursor: 'pointer' }}>🛒 <small style={{ fontSize: '12px' }}>0</small></span>
  <span style={{ cursor: 'pointer' }}>🤍 <small style={{ fontSize: '12px' }}>0</small></span>
  <span style={{ cursor: 'pointer' }}>🎧</span>
  <span style={{ cursor: 'pointer' }}>🌐</span>
</div>
      <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
        <h1 style={{ color: '#d63384' }}>Dashboard แอดมิน - GLAZED JADE</h1>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
          <h3>รายการสั่งซื้อทั้งหมด</h3>
          <p>แอดมินสามารถดูข้อมูลการเลือกทรงเล็บ รูปภาพ และที่อยู่จัดส่งของลูกค้าได้ที่นี่</p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tr style={{ backgroundColor: '#fce4ec', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>ลูกค้า</th>
              <th style={{ padding: '10px' }}>สเปคเล็บ</th>
              <th style={{ padding: '10px' }}>สถานะการชำระเงิน</th>
            </tr>
            <tr>
              <td style={{ padding: '10px' }}>คุณมินท์ (ตัวอย่าง)</td>
              <td style={{ padding: '10px' }}>ทรง Square / ยาวพิเศษ / มีรูปแบบที่อัปโหลด</td>
              <td style={{ padding: '10px', color: 'green' }}>จ่ายแล้ว (พร้อมเพย์)</td>
            </tr>
          </table>
        </div>
        <button onClick={() => setIsAdmin(false)} style={{ marginTop: '20px', padding: '10px' }}>กลับหน้าสั่งซื้อ</button>
      </div>
    );
  }

  // --- หน้าจอสำหรับลูกค้า (GLAZED JADE) ---
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff5f7', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#d63384', fontSize: '48px', margin: '0' }}>💅 GLAZED JADE</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>สั่งทำเล็บปลอมแบบ Custom พร้อมระบบสะสมแต้มหลังใช้งาน</p>
      </header>

      <div style={{ maxWidth: '600px', margin: 'auto', backgroundColor: 'white', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3>1. เลือกรูปแบบเล็บ</h3>
          <select style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '10px', border: '1px solid #ddd' }}>
            <option>เลือกทรงเล็บ: Square / Oval / Almond / Coffin</option>
            <option>Square</option>
            <option>Oval</option>
            <option>Almond</option>
            <option>Coffin</option>
          </select>
          <select style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }}>
            <option>เลือกความยาว: สั้น / กลาง / ยาวพิเศษ</option>
            <option>สั้น</option>
            <option>กลาง</option>
            <option>ยาวพิเศษ</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>2. เพิ่มรูปแบบเล็บที่ต้องการ (อัปโหลดรูปเอง)</h3>
          <input type="file" accept="image/*" style={{ padding: '10px', width: '100%', border: '1px dashed #d63384', borderRadius: '10px' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>3. ข้อมูลจัดส่ง</h3>
          <textarea placeholder="กรอกชื่อผู้รับ เบอร์โทร และที่อยู่จัดส่งอย่างละเอียด" style={{ width: '100%', height: '100px', padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }}></textarea>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#fff0f6', padding: '20px', borderRadius: '20px', border: '2px dashed #d63384' }}>
          <p style={{ fontWeight: 'bold' }}>ชำระเงินผ่านพร้อมเพย์</p>
          {/* ส่วนแสดง QR Code พร้อมเพย์ */}
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PROMPTPAY" alt="QR Code" style={{ width: '150px', marginBottom: '10px' }} />
          <p style={{ fontSize: '14px', color: '#d63384' }}>สแกนเพื่อจ่ายเงินและรับแต้มสะสมทันที!</p>
          <button style={{ width: '100%', backgroundColor: '#d63384', color: 'white', border: 'none', padding: '15px', borderRadius: '30px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
            ยืนยันการสั่งซื้อ
          </button>
        </div>
      </div>

      <footer style={{ marginTop: '50px', textAlign: 'center', opacity: 0.6 }}>
        <p style={{ fontSize: '12px' }}>พื้นที่สำหรับแอดมิน</p>
        <input placeholder="User" onChange={(e) => setU(e.target.value)} style={{ width: '80px', marginRight: '5px', padding: '5px' }} />
        <input type="password" placeholder="Pass" onChange={(e) => setP(e.target.value)} style={{ width: '80px', marginRight: '5px', padding: '5px' }} />
        <button onClick={handleAdminLogin} style={{ padding: '5px 15px', cursor: 'pointer' }}>เข้าสู่ระบบ</button>
      </footer>
    </div>
  );
}
