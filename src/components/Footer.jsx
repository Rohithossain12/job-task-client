const Footer = () => {
  return (
    <footer className="footer bg-green-500 sm:footer-horizontal footer-center text-white p-4">
      <aside>
        <p className="text-lg font-bold">
          Copyright © {new Date().getFullYear()} - All right reserved by Rohit
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
