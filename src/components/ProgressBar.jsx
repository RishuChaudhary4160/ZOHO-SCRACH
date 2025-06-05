function ProgressBar({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(255, 255, 255, 0.3)",
    borderTop: "5px solid #00A8c6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default ProgressBar;
