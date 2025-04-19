import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/Admin.css';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://versed-mire-vegetable.glitch.me/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Gagal fetch data:', err);
    }
  };

  const handleDelete = async (name, tableNumber) => {
    try {
      const updated = orders.filter(
        (o) => !(o.name === name && o.tableNumber === tableNumber)
      );
      setOrders(updated);
      await axios.post('https://versed-mire-vegetable.glitch.me/api/save-orders', updated);
    } catch (err) {
      console.error('Gagal menghapus data:', err);
    }
  };  

  const filtered = orders.filter(order => {
    const name = order.name || '';
    const tableNumber = order.tableNumber?.toString() || '';
    const notes = order.notes || '';
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      tableNumber.toLowerCase().includes(search.toLowerCase()) ||
      notes.toLowerCase().includes(search.toLowerCase())
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortKey]?.toString().toLowerCase() || '';
    const valB = b[sortKey]?.toString().toLowerCase() || '';
    return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title">Halaman Admin - Pesanan</h2>
        <div className="admin-actions right">
          <motion.input
            type="text"
            className="search-input"
            placeholder="🔍 Cari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <motion.table
          className="modern-table"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Nama</th>
              <th>Menu</th>
              <th>Jumlah</th>
              <th>Ukuran</th>
              <th>Penyajian</th>
              <th onClick={() => handleSort('tableNumber')}>No Meja</th>
              <th onClick={() => handleSort('notes')}>Catatan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((order, index) => (
              order.orders?.map((item, idx) => (
                <motion.tr
                  key={`${index}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                >
                  {idx === 0 && (
                    <>
                      <td rowSpan={order.orders.length}>{order.name}</td>
                      <td>{item.menu}</td>
                      <td>{item.jumlah}</td>
                      <td>{item.ukuran}</td>
                      <td>{item.penyajian}</td>
                      <td rowSpan={order.orders.length}>{order.tableNumber}</td>
                      <td rowSpan={order.orders.length}>{order.notes}</td>
                      <td rowSpan={order.orders.length}>
                      <button onClick={() => handleDelete(order.name, order.tableNumber)}>🗑</button>
                      </td>
                    </>
                  )}
                  {idx !== 0 && (
                    <>
                      <td>{item.menu}</td>
                      <td>{item.jumlah}</td>
                      <td>{item.ukuran}</td>
                      <td>{item.penyajian}</td>
                    </>
                  )}
                </motion.tr>
              ))
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default Admin;