import dayjs from "dayjs";

export const validateSearchData = (id, checkIn, checkOut, guest) => {
  //validate empty
  if (
    id == "" ||
    checkIn == "" ||
    checkOut == "" ||
    guest == "" ||
    id == undefined
  ) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return false;
  }
  //validate checkIn, checkOut date
  if (checkIn.isAfter(checkOut)) {
    alert("Ngày nhận phòng phải trước ngày trả phòng");
    return false;
  }
  if (/^[0-9]+$/.test(guest) == false) {
    alert("Vui lòng chỉ nhập định dạng số ở mục thêm khách");
    return false;
  }
  if (!dayjs(checkIn).isValid() || !dayjs(checkOut).isValid()) {
    alert("Vui lòng nhập đúng định dạng phòng");
    return false;
  }
  if (Number(guest) > 16 || Number(guest) < 1) {
    alert("Số khách phải từ 1 đến 16 khách");
    return false;
  }
  return true;
};

export const formatSearchData = (data) => {
  const res = [];
  data?.forEach((it) => {
    const tempObj = {};
    tempObj.tenViTri = it.tenViTri;
    tempObj.tinhThanh = it.tinhThanh;
    tempObj.quocGia = it.quocGia;
    tempObj.id = it.id;
    res.push(tempObj);
  });
  return res;
};

export const calculateDayStay = (checkInDate, checkOutDate) => {
  const day1 = dayjs(checkInDate, "MM-DD-YYYY");
  const day2 = dayjs(checkOutDate, "MM-DD-YYYY");
  return day2.diff(day1, "day");
};

export const dayStaysValidation = (checkinDate, checkOutDate) => {
  if (calculateDayStay(checkinDate, checkOutDate) == 0) {
    return 1;
  } else if (calculateDayStay(checkinDate, checkOutDate) > 0) {
    return calculateDayStay(checkinDate, checkOutDate);
  } else {
    alert("Vui lòng nhập ngày nhận phòng trước ngày trả phòng");
    return 0;
  }
};

export const validateBookingData = (checkinDate, checkOutDate, guest) => {
  if (guest == "" || checkOutDate == "" || checkinDate == "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return false;
  }
  if (!dayjs(checkinDate).isValid() || !dayjs(checkOutDate).isValid()) {
    alert("Vui lòng nhập đúng định dạng phòng");
    return false;
  }
  if (dayStaysValidation(checkinDate, checkOutDate) == 0) {
    return false;
  }
  if (guest < 1 || guest > 16) {
    alert("Phòng phải có từ 1 và đến 16 khách");
    return false;
  }
  if (/^\d+$/.test(guest) == false) {
    alert("Vui lòng nhập số lượng khách ở định dạng số");
    return false;
  }
  return true;
};

export const validateUserInfoEdit = (birthday, gender) => {
  if (birthday == "" || gender == "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return false;
  }
  return true;
};

export const formatDataAdmin = (data, flag) => {
  const resList = [];
  switch (flag) {
    case 1:
      data?.forEach((it) => {
        const objFormat = {};
        objFormat.filed1 = it.id;
        objFormat.filed2 = it.name;
        objFormat.filed3 = it.email;
        objFormat.filed4 = it.role;
        resList.push(objFormat);
      });
      return resList;
    case 2:
      data?.forEach((it) => {
        const objFormat = {};
        objFormat.filed1 = it.id;
        objFormat.filed2 = it.tenViTri;
        objFormat.filed3 = it.tinhThanh;
        objFormat.filed4 = it.quocGia;
        resList.push(objFormat);
      });
      return resList;
    case 3:
      data?.forEach((it) => {
        const objFormat = {};
        objFormat.filed1 = it.id;
        objFormat.filed2 = it.tenPhong;
        objFormat.filed3 = it.khach;
        objFormat.filed4 = it.giaTien;
        resList.push(objFormat);
      });
      return resList;
    case 4:
      data?.forEach((it) => {
        const objFormat = {};
        objFormat.filed1 = it.id;
        objFormat.filed2 = it.maPhong;
        objFormat.filed3 = it.soLuongKhach;
        objFormat.filed4 = it.maNguoiDung;
        resList.push(objFormat);
      });
      return resList;

    default:
      break;
  }
};
export const formatSearchDataAdmin = (searchData, flag) => {
  const objFormat = {};
  switch (flag) {
    case 1:
      objFormat.filed1 = searchData.id;
      objFormat.filed2 = searchData.name;
      objFormat.filed3 = searchData.email;
      objFormat.filed4 = searchData.role;
      return objFormat;
    case 2:
      objFormat.filed1 = searchData.id;
      objFormat.filed2 = searchData.tenViTri;
      objFormat.filed3 = searchData.tinhThanh;
      objFormat.filed4 = searchData.quocGia;
      return objFormat;
    case 3:
      objFormat.filed1 = searchData.id;
      objFormat.filed2 = searchData.tenPhong;
      objFormat.filed3 = searchData.khach;
      objFormat.filed4 = searchData.giaTien;
      return objFormat;
    case 4:
      objFormat.filed1 = searchData.id;
      objFormat.filed2 = searchData.maPhong;
      objFormat.filed3 = searchData.soLuongKhach;
      objFormat.filed4 = searchData.maNguoiDung;
      return objFormat;
    default:
      break;
  }
};

export const validateAdminSearch = (searchString) => {
  if (searchString == "") {
    alert("Vui lòng nhập thông tin để tìm kiếm");
    return false;
  }
  if (/^\d+$/.test(searchString) == false) {
    alert("Vui lòng nhập thông tin tìm kiếm ở định dạng số");
    return false;
  }
  if (searchString < 0) {
    alert("Vui lòng nhập số lớn hơn 0");
    return false;
  }
  return true;
};
