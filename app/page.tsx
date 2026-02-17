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

  // --- 3.
