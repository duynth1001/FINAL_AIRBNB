
export const handleScroll = (key) => {
  switch (key) {
    case "Nơi ở":
      const eleBanner = document.getElementById("HomePageBanner");
      if (eleBanner) {
        eleBanner.scrollIntoView({ behavior: "smooth" });
      }
      break;
    case "Trải nghiệm":
      const eleTraiNghiem = document.getElementById("TraiNghiem");
      if (eleTraiNghiem) {
        eleTraiNghiem.scrollIntoView({ behavior: "smooth" });
      }
      break;
    case "Trải nghiệm trực tuyến":
      const eleTraiNghiemTrucTuyen = document.getElementById(
        "TraiNghiemTrucTuyen"
      );
      if (eleTraiNghiemTrucTuyen) {
        eleTraiNghiemTrucTuyen.scrollIntoView({ behavior: "smooth" });
      }
      break;
  }
};
