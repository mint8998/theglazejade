"use client";
import React, { useState } from 'react';

export default function Home() {
  // --- States สำหรับจัดการหน้าจอและข้อมูล ---
  const [view, setView] = useState('login'); // login, register, shop, admin
  const [cartCount, setCartCount] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [points, setPoints] = useState(0);
  
  // ข้อมูล Login/Admin
  const [u, setU] = useState('');
  const [p, setP] = useState('');

  // ฟังก์ชันการทำงาน
  const handleLogin = () => {
    if (u === 'admin' && p === '12345678') {
      setView('admin');
    } else if (u !== "" && p !== "") {
      setCustomerName(u);
      setPoints(10); // สมมติว่าล็อกอินแล้วได้แต้มขวัญถุง
      setView('shop');
    } else {
      alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
    }
  };

  const handleRegister = () => {
    alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
    setView('login');
  };

  // --- 1. หน้าเข้าสู่ระบบ (Login Page) ---
  if (view === 'login') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#fff5f7', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#d63384', fontSize: '40px' }}>💅 GLAZED JADE</h1>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '300px', textAlign: 'center' }}>
          <h2>เข้าสู่ระบบ</h2>
          <input placeholder="ชื่อผู้ใช้ / Admin" onChange={(e) => setU(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '10px', border: '1px solid #ddd' }} />
          <input type="password" placeholder="รหัสผ่าน" onChange={(e) => setP(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ddd' }} />
          <button onClick={handleLogin} style={{ width: '100%', backgroundColor: '#d63384', color: 'white', padding: '12px', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>เข้าสู่ระบบ</button>
          <p style={{ marginTop: '15px', fontSize: '14px' }}>ยังไม่มีบัญชี? <span onClick={() => setView('register')} style={{ color: '#d63384', cursor: 'pointer', fontWeight: 'bold' }}>สมัครสมาชิก</span></p>
        </div>
      </div>
    );
  }

  // --- 2. หน้าสมัครสมาชิก (Register Page) ---
  if (view === 'register') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#fff5f7', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '300px', textAlign: 'center' }}>
          <h2>สมัครสมาชิก</h2>
          <input placeholder="ชื่อ-นามสกุล" style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '10px', border: '1px solid #ddd' }} />
          <input placeholder="เบอร์โทรศัพท์" style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '10px', border: '1px solid #ddd' }} />
          <input type="password" placeholder="ตั้งรหัสผ่าน" style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ddd' }} />
          <button onClick={handleRegister} style={{ width: '100%', backgroundColor: '#333', color: 'white', padding: '12px', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>ยืนยันการสมัคร</button>
          <p onClick={() => setView('login')} style={{ marginTop: '15px', fontSize: '14px', cursor: 'pointer', color: '#666' }}>ย้อนกลับไปหน้าล็อกอิน</p>
        </div>
      </div>
    );
  }

  // --- 3. หน้าสั่งซื้อเล็บ (Shop Page) ---
  if (view === 'shop') {
    return (
      <div style={{ padding: '10px', backgroundColor: '#fff5f7', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', padding: '10px', fontSize: '22px' }}>
          <span style={{ cursor: 'pointer' }}>🛒 <small style={{ color: 'red' }}>{cartCount}</small></span>
          <span onClick={() => { setView('login'); setCustomerName(''); }} style={{ cursor: 'pointer' }}>Logout 🚪</span>
        </div>

        <header style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ color: '#d63384' }}>GLAZED JADE</h1>
          <p>คุณ: <b>{customerName}</b> | แต้มของคุณ: <b style={{ color: '#d63384' }}>{points} แต้ม</b></p>
        </header>

        <div style={{ maxWidth: '450px', margin: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
          <h3>สั่งทำเล็บปลอมแบบสั่งทำ</h3>
          <select style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
            <option>เลือกทรงเล็บ</option><option>Square</option><option>Oval</option>
          </select>
          <input type="file" style={{ marginBottom: '15px' }} />
          <textarea placeholder="ที่อยู่จัดส่ง" style={{ width: '100%', height: '60px', marginBottom: '15px' }}></textarea>
          <button onClick={() => setCartCount(cartCount + 1)} style={{ width: '100%', backgroundColor: '#d63384', color: 'white', padding: '15px', border: 'none', borderRadius: '30px', fontWeight: 'bold' }}>เพิ่มลงตะกร้า / สั่งซื้อ</button>
        </div>
      </div>
    );
  }

  // --- 4. หน้าแอดมิน (Admin Page) ---
  if (view === 'admin') {
    return (
      <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#d63384' }}>แอดมินหลังบ้าน (Excel Connected)</h1>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
          <p><b>ออเดอร์ล่าสุด:</b> ข้อมูลจะถูกดึงมาจาก Excel</p>
          <table border={1} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <tr><th>ชื่อลูกค้า</th><th>สเปค</th><th>ที่อยู่</th></tr>
            <tr><td>{u}</td><td>Square / สั้น</td><td>จันทบุรี</td></tr>
          </table>
        </div>
        <button onClick={() => setView('login')} style={{ marginTop: '20px', padding: '10px' }}>ออกจากระบบแอดมิน</button>
      </div>
    );
  }

  return null;
}
