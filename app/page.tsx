"use client";
import React, { useState } from 'react';

export default function Home() {
  const [view, setView] = useState('login'); 
  const [cartCount, setCartCount] = useState(0);
  const [customerName, setCustomerName] = useState('');
  
  const [u, setU] = useState('');
  const [p, setP] = useState('');

  // สีที่คุณเลือก (HEX Codes)
  const colors = {
    primary: '#9CAF88',   // Sage Green
    base: '#F5F5DC',      // Cream White
    accent: '#8B8589',    // Warm Gray
    highlight: '#C5A059', // Soft Gold
  };

  const handleLogin = () => {
    if (u === 'admin' && p === '12345678') setView('admin');
    else if (u !== "" && p !== "") { setCustomerName(u); setView('shop'); }
    else alert("กรุณากรอกข้อมูลให้ครบถ้วน");
  };

  // --- 1. หน้า Login ---
  if (view === 'login') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: colors.base, fontFamily: 'sans-serif' }}>
        <h1 style={{ color: colors.primary, fontSize: '42px', marginBottom: '20px', letterSpacing: '2px' }}>GLAZED JADE</h1>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '320px', textAlign: 'center', borderTop: `5px solid ${colors.highlight}` }}>
          <h2 style={{ color: colors.accent, marginBottom: '20px' }}>เข้าสู่ระบบ</h2>
          <input placeholder="ชื่อผู้ใช้" onChange={(e) => setU(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: `1px solid ${colors.primary}44`, outline: 'none' }} />
          <input type="password" placeholder="รหัสผ่าน" onChange={(e) => setP(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '25px', borderRadius: '8px', border: `1px solid ${colors.primary}44`, outline: 'none' }} />
          <button onClick={handleLogin} style={{ width: '100%', backgroundColor: colors.primary, color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>LOGIN</button>
          <p style={{ marginTop: '20px', fontSize: '14px', color: colors.accent }}>ยังไม่มีบัญชี? <span onClick={() => setView('register')} style={{ color: colors.highlight, cursor: 'pointer', fontWeight: 'bold' }}>สมัครสมาชิก</span></p>
        </div>
      </div>
    );
  }

  // --- 2. หน้า Register ---
  if (view === 'register') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: colors.base, fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', width: '320px', textAlign: 'center', borderTop: `5px solid ${colors.primary}` }}>
          <h2 style={{ color: colors.accent }}>สมัครสมาชิก</h2>
          <input placeholder="ชื่อ-นามสกุล" style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: `1px solid ${colors.accent}44` }} />
          <input type="password" placeholder="ตั้งรหัสผ่าน" style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: `1px solid ${colors.accent}44` }} />
          <button onClick={() => setView('login')} style={{ width: '100%', backgroundColor: colors.highlight, color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>ยืนยันสมัครสมาชิก</button>
          <p onClick={() => setView('login')} style={{ marginTop: '15px', cursor: 'pointer', color: colors.accent }}>ย้อนกลับ</p>
        </div>
      </div>
    );
  }

  // --- 3. หน้า Shop ---
  if (view === 'shop') {
    return (
      <div style={{ backgroundColor: colors.base, minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <nav style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '20px', fontSize: '24px', color: colors.accent }}>
          <span style={{ cursor: 'pointer', position: 'relative' }}>🛒 <small style={{ position: 'absolute', top: '-5px', right: '-10px', backgroundColor: colors.highlight, color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '12px' }}>{cartCount}</small></span>
          <span onClick={() => setView('login')} style={{ cursor: 'pointer' }}>🚪</span>
        </nav>

        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: colors.primary, fontSize: '36px', margin: '0' }}>GLAZED JADE</h1>
          <p style={{ color: colors.accent }}>คุณ: <b style={{ color: colors.highlight }}>{customerName}</b> | สะสม 10 แต้ม</p>
        </header>

        <main style={{ maxWidth: '500px', margin: 'auto', backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: colors.primary, borderLeft: `4px solid ${colors.highlight}`, paddingLeft: '10px' }}>ออกแบบเล็บของคุณ</h3>
          <select style={{ width: '100%', padding: '12px', margin: '15px 0', borderRadius: '8px', border: `1px solid ${colors.accent}44` }}>
            <option>เลือกทรงเล็บ (Square / Oval / Almond)</option>
          </select>
          <div style={{ border: `2px dashed ${colors.primary}`, padding: '20px', textAlign: 'center', marginBottom: '20px', borderRadius: '10px' }}>
            <input type="file" />
            <p style={{ fontSize: '12px', color: colors.accent, marginTop: '5px' }}>อัปโหลดลายเล็บที่ต้องการ</p>
          </div>
          <textarea placeholder="ที่อยู่จัดส่ง" style={{ width: '100%', height: '80px', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.accent}44`, marginBottom: '20px' }}></textarea>
          <button onClick={() => setCartCount(cartCount + 1)} style={{ width: '100%', backgroundColor: colors.primary, color: 'white', padding: '15px', border: 'none', borderRadius: '30px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>
            เพิ่มลงตะกร้า / สั่งทำ
          </button>
        </main>
      </div>
    );
  }

  // --- 4. หน้า Admin ---
  if (view === 'admin') {
    return (
      <div style={{ padding: '40px', backgroundColor: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: colors.primary }}>Admin Management</h1>
        <div style={{ padding: '20px', backgroundColor: colors.base, borderRadius: '10px' }}>
          <p style={{ color: colors.accent }}>ระบบดึงข้อมูลจาก Excel (Google Sheets) อัตโนมัติ</p>
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', borderLeft: `5px solid ${colors.highlight}` }}>
            <p><b>ลูกค้าล่าสุด:</b> คุณ {u} | <b>ทรงเล็บ:</b> Square | <b>สถานะ:</b> รอตรวจสอบสลิป</p>
          </div>
        </div>
        <button onClick={() => setView('login')} style={{ marginTop: '20px', backgroundColor: colors.accent, color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>ออกจากระบบ</button>
      </div>
    );
  }

  return null;
}
