const checkAdmin = (req, res, next) => {
  const user = req.user; // Giả sử thông tin user đã được giải mã từ token và gán vào req.user

  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next(); // Tiếp tục nếu user có quyền admin
};

export default checkAdmin;
