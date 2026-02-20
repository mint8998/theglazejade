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
    image: "",
  });

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("users") || "[]");
    const o = JSON.parse(localStorage.getItem("orders") || "[]");
    const cu = JSON.parse(localStorage.getItem("currentUser") || "null");

    setUsers(u);
    setOrders(o);

    if (cu) {
      setUser(cu);
      setPage(cu.admin ? "admin" : "dashboard");
    }
  }, []);

  const saveAll = (u:any[], o:any[]) => {
    setUsers(u);
    setOrders(o);
    localStorage.setItem("users", JSON.stringify(u));
    localStorage.setItem("orders", JSON.stringify(o));
  };

  const register = () => {
    if (!form.username || !form.password) return alert("กรอกข้อมูล");

    if (users.find(u => u.username === form.username))
      return alert("มีผู้ใช้นี้แล้ว");

    const newUsers = [
      ...users,
      { username: form.username, password: form.password, points: 0 },
    ];

    saveAll(newUsers, orders);
    alert("สมัครสำเร็จ");
    setPage("login");
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

    const found = users.find(
      u =>
        u.username === form.username &&
        u.password === form.password
    );

    if (!found) return alert("ไม่พบผู้ใช้");

    setUser(found);
    localStorage.setItem("currentUser", JSON.stringify(found));
    setPage("dashboard");
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

    const newOrders = [...orders, newOrder];

    const newUsers = users.map(u =>
      u.username === user.username
        ? { ...u, points: (u.points || 0) + 10 }
        : u
    );

    saveAll(newUsers, newOrders);
    alert("สั่งซื้อสำเร็จ");
  };

  if (page === "login")
    return (
      <div style={{ padding: 20 }}>
        <h1>GLAZED JADE</h1>

        <input
          placeholder="Username"
          onChange={e =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          placeholder="Password"
          type="password"
          onChange={e =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={login}>Login</button>
        <button onClick={() => setPage("register")}>
          Register
        </button>
      </div>
    );

  if (page === "register")
    return (
      <div style={{ padding: 20 }}>
        <h2>สมัครสมาชิก</h2>

        <input
          placeholder="Username"
          onChange={e =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          placeholder="Password"
          type="password"
          onChange={e =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={register}>สมัคร</button>
      </div>
    );

  if (page === "dashboard")
    return (
      <div style={{ padding: 20 }}>
        <h2>สวัสดี {user.username}</h2>

        <select
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
        </select>

        <input
          placeholder="ที่อยู่จัดส่ง"
          onChange={e =>
            setOrderForm({
              ...orderForm,
              address: e.target.value,
            })
          }
        />

        <button onClick={createOrder}>
          สั่งซื้อ
        </button>

        <button onClick={logout}>Logout</button>
      </div>
    );

  if (page === "admin")
    return (
      <div style={{ padding: 20 }}>
        <h2>ADMIN PANEL</h2>

        {orders.map(o => (
          <div key={o.id}>
            <p>{o.user}</p>
            <p>{o.status}</p>
          </div>
        ))}

        <button onClick={logout}>Logout</button>
      </div>
    );

  return null;
}
