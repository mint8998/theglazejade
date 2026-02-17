"use client";
import React, { useState } from 'react';

export default function NailShop() {
  const [view, setView] = useState('shop'); // shop, cart, checkout, admin
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [address, setAddress] = useState('');
  const [adminU, setAdminU] = useState('');
  const [adminP, setAdminP] = useState('');

  const shapes = ["ทรงเหลี่ยม (Square)", "ทรงมน (Oval)", "ทรงบัลเลต์ (Coffin)", 
    "พส.เวียดนาม (ปลายแหลมเฉี่ยวยาว)", "พส.จีน (ทรงเหลี่ยมยาว)];
  const pricePerSet = 199; // ราคาสมมติ 199 บาทต่อชุด

  // 1. เพิ่มลงตะกร้า (หน้าแรก)
  const addToCart = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const item = {
      id: Date.now(),
      shape: fd.get('shape'),
      len: fd.get('len'),
      price: pricePerSet,
      date: new Date().toLocaleDateString()
    };
    setCart([...cart, item]);
    alert('เพิ่มลงตะกร้าแล้ว! จิ้มไอคอนตะกร้าเพื่อดู');
  };

  // 2. เลือกสินค้าในตะกร้า
  const toggleSelect = (id) => {
    if (selectedItems.includes(id)) setSelectedItems(selectedItems.filter(i => i !== id));
    else setSelectedItems([...selectedItems, id]);
  };

  const totalPrice = cart.filter(i => selectedItems.includes(i.id)).reduce((sum, i) => sum + i.price, 0);

  // --- หน้าแอดมิน (รหัส 12345678) ---
  if (view === 'admin') {
    return (
      <div style={{ padding: '20px' }}>
        <h2>แอดมิน: ดูประวัติสั่งซื้อ (รหัส 1-8)</h2>
        <input type="date" /> ถึง <input type="date" />
        <button onClick={() => setView('shop')}>กลับหน้าหลัก</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff5f7', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#d63384' }}>💅 GLAZED JADE</h1>
        <button onClick={() => setView('cart')} style={{ fontSize: '24px', background: 'none', border: 'none' }}>🛒 ({cart.length})</button>
      </header>

      {/* --- หน้าแรก: เลือกทรงเล็บ --- */}
      {view === 'shop' && (
        <form onSubmit={addToCart} style={{ maxWidth: '400px', margin: 'auto', background: 'white', padding: '20px', borderRadius: '15px' }}>
          <h3>เลือกแบบที่ต้องการ</h3>
          <select name="shape" style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
            {shapes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="len" style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
            <option>สั้น</option><option>กลาง</option><option>ยาว</option>
          </select>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#d63384', color: 'white', border: 'none', borderRadius: '25px' }}>เพิ่มลงตะกร้า</button>
        </form>
      )}

      {/* --- หน้าตะกร้า: ติ๊กเลือกสินค้า --- */}
      {view === 'cart' && (
        <div style={{ maxWidth: '400px', margin: 'auto', background: 'white', padding: '20px', borderRadius: '15px' }}>
          <h3>ตะกร้าสินค้า (ติ๊กเลือกเพื่อสั่งซื้อ)</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => toggleSelect(item.id)} />
              <div style={{ marginLeft: '10px' }}>{item.shape} ({item.len}) - {item.price}฿</div>
              <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} style={{ marginLeft: 'auto', color: 'red' }}>ลบ</button>
            </div>
          ))}
          <button 
            disabled={selectedItems.length === 0}
            onClick={() => setView('checkout')}
            style={{ width: '100%', padding: '12px', marginTop: '20px', background: selectedItems.length ? '#d63384' : '#ccc', color: 'white', border: 'none', borderRadius: '25px' }}>
            สั่งซื้อที่เลือก ({selectedItems.length})
          </button>
          <button onClick={() => setView('shop')} style={{ width: '100%', marginTop: '10px' }}>กลับไปช้อปต่อ</button>
        </div>
      )}

      {/* --- หน้าสั่งซื้อ: สรุปราคา + ที่อยู่ + พร้อมเพย์ --- */}
      {view === 'checkout' && (
        <div style={{ maxWidth: '400px', margin: 'auto', background: 'white', padding: '20px', borderRadius: '15px' }}>
          <h3>สรุปรายการสั่งซื้อ</h3>
          <p>ยอดรวมทั้งสิ้น: <b>{totalPrice} บาท</b></p>
          <textarea 
            placeholder="กรอกที่อยู่จัดส่ง (จำเป็น)" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: '100%', height: '80px', padding: '10px', marginBottom: '15px' }}
          />
          
          {address.length > 5 ? (
            <div style={{ textAlign: 'center', background: '#f9f9f9', padding: '15px', borderRadius: '10px' }}>
              <p style={{ color: 'green' }}>✓ ที่อยู่ครบถ้วน ชำระเงินได้เลย</p>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PROMPTPAY_${totalPrice}`} alt="QR" />
              <p>Scan เพื่อจ่าย {totalPrice}฿</p>
              <button onClick={() => alert('บันทึกคำสั่งซื้อแล้ว!')} style={{ width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '25px' }}>แจ้งโอนเงิน & รับแต้ม</button>
            </div>
          ) : (
            <p style={{ color: 'red', textAlign: 'center' }}>⚠️ กรุณาใส่ที่อยู่จัดส่งเพื่อดู QR Code</p>
          )}
          <button onClick={() => setView('cart')} style={{ width: '100%', marginTop: '10px' }}>ย้อนกลับ</button>
        </div>
      )}

      {/* --- ส่วนแอดมินท้ายเว็บ --- */}
      <footer style={{ marginTop: '50px', textAlign: 'center', opacity: 0.4 }}>
        <input placeholder="admin" onChange={e => setAdminU(e.target.value)} style={{ width: '60px' }} />
        <input type="password" placeholder="1-8" onChange={e => setAdminP(e.target.value)} style={{ width: '60px' }} />
        <button onClick={() => { if(adminU==='admin' && adminP==='12345678') setView('admin'); else alert('รหัสผิด'); }}>Admin</button>
      </footer>
    </div>
  );
}
