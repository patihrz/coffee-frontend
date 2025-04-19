import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import menuData from "../data/menuData";
import "../styles/OrderForm.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    nama: "",
    meja: "",
    pesanan: [{ menu: "", jumlah: 1, ukuran: "Medium", penyajian: "Hot" }],
    catatan: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e, index, field) => {
    const updated = [...formData.pesanan];
    updated[index][field] = e.target.value;
    setFormData({ ...formData, pesanan: updated });
  };

  const handleAddPesanan = () => {
    setFormData({
      ...formData,
      pesanan: [...formData.pesanan, { menu: "", jumlah: 1, ukuran: "Medium", penyajian: "Hot" }],
    });
  };

  const handleRemovePesanan = (index) => {
    const updated = [...formData.pesanan];
    updated.splice(index, 1);
    setFormData({ ...formData, pesanan: updated });
  };

  const getCategory = (menuName) => {
    const item = menuData.find((m) => m.name === menuName);
    return item ? item.category : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adaKosong = formData.pesanan.some((p) => p.menu.trim() === "");
    if (adaKosong) {
      toast.warning("Pastikan semua menu telah dipilih!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    setLoading(true);

    const mappedPesanan = formData.pesanan.map((item) => ({
      menu: item.menu,
      quantity: item.jumlah,
      size: item.ukuran,
      serving: item.penyajian,
    }));

    const payload = {
      name: formData.nama,
      tableNumber: formData.meja,
      notes: formData.catatan,
      orders: mappedPesanan,
    };

    try {
      console.log("Payload:", payload); // buat debug
      await axios.post("https://versed-mire-vegetable.glitch.me/api/order", payload);

      toast.success("Pesanan berhasil dikirim!", {
        position: "bottom-center",
        autoClose: 5000,
        theme: "colored",
        style: { marginBottom: "120px" },
      });

      setFormData({
        nama: "",
        meja: "",
        pesanan: [{ menu: "", jumlah: 1, ukuran: "Medium", penyajian: "Hot" }],
        catatan: "",
      });
    } catch (err) {
      console.error("Gagal kirim:", err.response?.data || err.message);
      toast.error("Gagal mengirim pesanan!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="order-form-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="form-title">Form Pemesanan</h2>
      <form onSubmit={handleSubmit}>
        <label>Nama</label>
        <input
          type="text"
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          required
        />

        <label>Nomor Meja</label>
        <input
          type="text"
          value={formData.meja}
          onChange={(e) => setFormData({ ...formData, meja: e.target.value })}
          required
        />

        {formData.pesanan.map((pesan, index) => {
          const kategori = getCategory(pesan.menu);

          return (
            <motion.div
              key={index}
              className="pesanan-group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <label>Pilih Menu #{index + 1}</label>
              <select
                value={pesan.menu}
                onChange={(e) => handleChange(e, index, "menu")}
                required
              >
                <option value="">-- Pilih Menu --</option>
                {menuData.map((item, i) => (
                  <option key={i} value={item.name}>
                    {item.name} ({item.category})
                  </option>
                ))}
              </select>

              <label>Jumlah</label>
              <input
                type="number"
                min="1"
                value={pesan.jumlah}
                onChange={(e) => handleChange(e, index, "jumlah")}
                required
              />

              <AnimatePresence>
                {kategori !== "Makanan" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label>Ukuran</label>
                    <select
                      value={pesan.ukuran}
                      onChange={(e) => handleChange(e, index, "ukuran")}
                    >
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>

                    <label>Penyajian</label>
                    <select
                      value={pesan.penyajian}
                      onChange={(e) => handleChange(e, index, "penyajian")}
                    >
                      <option value="Hot">Hot</option>
                      <option value="Ice">Ice</option>
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              {formData.pesanan.length > 1 && (
                <motion.button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemovePesanan(index)}
                  whileTap={{ scale: 0.95 }}
                >
                  Hapus
                </motion.button>
              )}
              <hr />
            </motion.div>
          );
        })}

        <motion.button
          type="button"
          className="btn-tambah"
          onClick={handleAddPesanan}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + Tambah Menu
        </motion.button>

        <label>Catatan</label>
        <textarea
          placeholder="Contoh: tanpa gula, jangan pakai es..."
          value={formData.catatan}
          onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
        />

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Pesan Sekarang"}
        </motion.button>
      </form>
      <ToastContainer />
    </motion.div>
  );
};

export default OrderForm;
