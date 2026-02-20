"use client";
import React, { useState, useEffect } from "react";

const ADMIN = {
username: "admin",
password: "12345678",
};

export default function Home() {
const [page, setPage] = useState("login");
const [user, setUser] = useState<any>(null);
const [users, setUsers] = useState<any[]>([]);
const [orders, setOrders] = useState<any[]>([]);

const [form, setForm] = useState({
username: "",
password: "",
});

const [orderForm, setOrderForm] = useState({
shape: "Almond",
address: "",
});

useEffect(() => {
const u = JSON.parse(localStorage.getItem("users") || "[]");
const o = JSON.parse(localStorage.getItem("orders") || "[]");
const cu = JSON.parse(localStorage.getItem("currentUser") || "null");

```
setUsers(u);
setOrders(o);

if (cu) {
  setUser(cu);
  setPage(cu.admin ? "admin" : "dashboard");
}
```

}, []);

const saveAll = (u:any, o:any) => {
setUsers(u);
setOrders(o);
localStorage.setItem("users", JSON.stringify(u));
localStorage.setItem("orders", JSON.stringify(o));
};

const register = () => {
if (!form.username || !form.password) return alert("กรอกข้อมูล");

```
if (users.find(u => u.username === form.username))
  return alert("มีผู้ใช้นี้แล้ว");

const newUsers = [
  ...users,
  { username: form.username, password: form.password, points: 0 },
];

saveAll(newUsers, orders);
alert("สมัครสำเร็จ");
setPage("login");
```

};

const login = () => {
if (
form.username === ADMIN.username &&
form.password === ADMIN.password
) {
const adminUser = { username: "admin", admin: true };
setUser(adminUser);
localStorage.setItem("currentUser", JSON.stringify(adminUser));
setPage("admin");
return;
}

```
const found = users.find(
  u =>
    u.username === form.username &&
    u.password === form.password
);

if (!found) return alert("ไม่พบผู้ใช้");

setUser(found);
localStorage.setItem("currentUser", JSON.stringify(found));
setPage("dashboard");
```

};

const logout = () => {
localStorage.removeItem("currentUser");
setUser(null);
setPage("login");
};

const createOrder = () => {
const newOrder = {
id: Date.now(),
user: user.username,
...orderForm,
status: "รอตรวจสอบ",
date: new Date().toLocaleString(),
};

```
const newOrders = [...orders, newOrder];

const newUsers = users.map(u =>
  u.username === user.username
    ? { ...u, points: (u.points || 0) + 10 }
    : u
);

saveAll(newUsers, newOrders);
alert("สั่งซื้อสำเร็จ ได้รับ 10 แต้ม");
```

};

const theme = {
bg: "#eef4f1",
primary: "#8FAF9B",
gold: "#C6A769",
cream: "#fdfaf6",
};

const container:any = {
background: theme.bg,
minHeight: "100vh",
padding: 20,
fontFamily: "Arial",
};

const card:any = {
maxWidth: 420,
margin: "auto",
background: theme.cream,
padding: 25,
borderRadius: 20,
boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
border: `1px solid ${theme.gold}`,
};

const input:any = {
width: "100%",
padding: 12,
marginTop: 10,
borderRadius: 10,
border: "1px solid #ddd",
};

const btn:any = {
width: "100%",
padding: 13,
marginTop: 12,
background: theme.primary,
color: "white",
border: "none",
borderRadius: 12,
fontWeight: "bold",
cursor: "pointer",
};

if (page === "login")
return ( <div style={container}> <div style={card}>
<h1 style={{ textAlign: "center", color: theme.primary }}>
GLAZED JADE </h1>

```
      <p style={{ textAlign: "center", color: theme.gold }}>
        Nail Studio ✨
      </p>

      <input
        style={input}
        placeholder="Username"
        onChange={e =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        style={input}
        placeholder="Password"
        type="password"
        onChange={e =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button style={btn} onClick={login}>
        Login
      </button>

      <button
        style={{ ...btn, background: theme.gold }}
        onClick={() => setPage("register")}
      >
        Register
      </button>
    </div>
  </div>
);
```

if (page === "register")
return ( <div style={container}> <div style={card}>
<h2 style={{ textAlign: "center" }}>สมัครสมาชิก</h2>

```
      <input
        style={input}
        placeholder="Username"
        onChange={e =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        style={input}
        placeholder="Password"
        type="password"
        onChange={e =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button style={btn} onClick={register}>
        สมัคร
      </button>

      <button
        style={{ ...btn, background: "#aaa" }}
        onClick={() => setPage("login")}
      >
        กลับ
      </button>
    </div>
  </div>
);
```

if (page === "dashboard")
return ( <div style={container}> <div style={card}> <h2>สวัสดี {user.username}</h2>

```
      <h3>สั่งทำเล็บ</h3>

      <select
        style={input}
        onChange={e =>
          setOrderForm({
            ...orderForm,
            shape: e.target.value,
          })
        }
      >
        <option>Almond</option>
        <option>Square</option>
        <option>Coffin</option>
        <option>Oval</option>
      </select>

      <input
        style={input}
        placeholder="ที่อยู่จัดส่ง"
        onChange={e =>
          setOrderForm({
            ...orderForm,
            address: e.target.value,
          })
        }
      />

      <div style={{ marginTop: 10 }}>
        💰 พร้อมเพย์: 061-913-8998
      </div>

      <button style={btn} onClick={createOrder}>
        สั่งซื้อ
      </button>

      <h3 style={{ marginTop: 20 }}>ออเดอร์ของฉัน</h3>

      {orders
        .filter(o => o.user === user.username)
        .map(o => (
          <div
            key={o.id}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              marginTop: 10,
              borderRadius: 10,
            }}
          >
            <p>ทรง: {o.shape}</p>
            <p>สถานะ: {o.status}</p>
            <p style={{ fontSize: 12 }}>{o.date}</p>
          </div>
        ))}

      <button
        style={{ ...btn, background: "#999" }}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  </div>
);
```

if (page === "admin")
return ( <div style={container}> <div style={card}> <h2>ADMIN PANEL</h2>

```
      {orders.map(o => (
        <div
          key={o.id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <p>ลูกค้า: {o.user}</p>
          <p>ทรง: {o.shape}</p>
          <p>ที่อยู่: {o.address}</p>
          <p>สถานะ: {o.status}</p>
        </div>
      ))}

      <button
        style={{ ...btn, background: "#999" }}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  </div>
);
```

return null;
}
