import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL_2 } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
  products: [],
  originalProducts: [],
  filters: {
    price: null,
    category: null,
    rating: null,
    brand: null,
    specRam: null,
    specStorage: null,
    screenType: null,
    operatingSystem: null,
    rearCamera: null,
    frontCamera: null,
    chip: null,
    battery: null,
    thoiGianTaiNghe: null,
    thoiGianHopSac: null,
    congSac: null,
    tuongThich: null,
    tienIch: null,
    hoTroKetNoi: null,
    dieuKhienBang: null,
    dungLuongPin: null,
    nguonVao: null,
    nguonRa: null,
    loaiPin: null,
    tienIchPin: null,
    khoiLuong: null,
    hieuSuatSac: null,
    dongSacToiDa: null,
    chatLieu: null,
    trongLuong: null,
  },
  currentSort: null,
  productsStatus: STATUS.IDLE,
  productSingle: [],
  productSingleStatus: STATUS.IDLE,
  similarProducts: [],
  similarProductsStatus: STATUS.IDLE,
};

// Hàm áp dụng bộ lọc
function applyFilters(products, filters) {
  let filteredProducts = products;
  if (filters.price) {
    filteredProducts = filteredProducts.filter((product) => {
      const discountedPrice =
        product.price * (1 - product.discountPercentage / 100);
      return (
        discountedPrice >= filters.price.min &&
        discountedPrice <= filters.price.max
      );
    });
  }
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category.toLowerCase() === filters.category.toLowerCase()
    );
  }
  if (filters.brand) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand.toLowerCase() === filters.brand.toLowerCase()
    );
  }
  if (filters.rating) {
    const minRating = parseFloat(filters.rating);
    const maxRating = minRating + 1;

    filteredProducts = filteredProducts.filter((product) => {
      const productRating = parseFloat(product.rating);
      return productRating >= minRating && productRating < maxRating;
    });
  }
  if (filters.specRam) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        return (
          productSpecs.RAM &&
          productSpecs.RAM.toLowerCase() === filters.specRam.toLowerCase()
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  if (filters.specStorage) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        return (
          productSpecs["Dung lượng lưu trữ"] &&
          productSpecs["Dung lượng lưu trữ"].toLowerCase() ===
            filters.specStorage.toLowerCase()
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }
  // Xử lý bộ lọc cho màn hình
  if (filters.screenType) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const screenInfo = productSpecs["Màn hình"];
        return (
          screenInfo &&
          screenInfo.toLowerCase().includes(filters.screenType.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho hệ điều hành
  if (filters.operatingSystem) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const osInfo = productSpecs["Hệ điều hành"];
        return (
          osInfo &&
          osInfo.toLowerCase().includes(filters.operatingSystem.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }
  // Xử lý bộ lọc cho Camera sau
  if (filters.rearCamera) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const rearCameraSpec = productSpecs["Camera sau"];
        return (
          rearCameraSpec &&
          rearCameraSpec
            .toLowerCase()
            .includes(filters.rearCamera.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Camera trước
  if (filters.frontCamera) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const frontCameraSpec = productSpecs["Camera trước"];
        return (
          frontCameraSpec &&
          frontCameraSpec
            .toLowerCase()
            .includes(filters.frontCamera.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }
  // Xử lý bộ lọc cho Chip
  if (filters.chip) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const chipSpec = productSpecs["Chip"];
        return (
          chipSpec &&
          chipSpec.toLowerCase().includes(filters.chip.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Pin, Sạc
  if (filters.battery) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const batterySpec = productSpecs["Pin, Sạc"].match(/\d+/g)?.[0]; // Lấy số đầu tiên từ chuỗi (giả sử đây là dung lượng pin)
        return batterySpec && parseInt(batterySpec) >= filters.battery;
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }
  // Xử lý bộ lọc cho Thời gian tai nghe
  if (filters.thoiGianTaiNghe) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        return (
          productSpecs["Thời gian tai nghe"] &&
          productSpecs["Thời gian tai nghe"]
            .toLowerCase()
            .includes(filters.thoiGianTaiNghe.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }
  // Xử lý bộ lọc cho Thời gian hộp sạc
  if (filters.thoiGianHopSac) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        return (
          productSpecs["Thời gian hộp sạc"] &&
          productSpecs["Thời gian hộp sạc"]
            .toLowerCase()
            .includes(filters.thoiGianHopSac.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }
  // Xử lý bộ lọc cho Cổng sạc
  if (filters.congSac) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        return (
          productSpecs["Cổng sạc"] &&
          productSpecs["Cổng sạc"] === filters.congSac
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Tương thích
  if (filters.tuongThich && filters.tuongThich.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        return filters.tuongThich.every(
          (t) =>
            productSpecs["Tương thích"] &&
            productSpecs["Tương thích"].includes(t)
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Tiện ích
  if (filters.tienIch && filters.tienIch.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        return filters.tienIch.every(
          (t) =>
            productSpecs["Tiện ích"] && productSpecs["Tiện ích"].includes(t)
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Hỗ trợ kết nối
  if (filters.hoTroKetNoi) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        return (
          productSpecs["Hỗ trợ kết nối"] &&
          productSpecs["Hỗ trợ kết nối"]
            .toLowerCase()
            .includes(filters.hoTroKetNoi.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Điều khiển bằng
  if (filters.dieuKhienBang) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        return (
          productSpecs["Điều khiển bằng"] &&
          productSpecs["Điều khiển bằng"]
            .toLowerCase()
            .includes(filters.dieuKhienBang.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  if (filters.dungLuongPin) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const dungLuongPin = productSpecs["Dung lượng pin"];
        return dungLuongPin && dungLuongPin >= filters.dungLuongPin;
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Nguồn vào
  if (filters.nguonVao) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const nguonVao = productSpecs["Nguồn vào"];
        return (
          nguonVao &&
          nguonVao.toLowerCase().includes(filters.nguonVao.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Nguồn ra
  if (filters.nguonRa) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const nguonRa = productSpecs["Nguồn ra"];
        return (
          nguonRa &&
          nguonRa.toLowerCase().includes(filters.nguonRa.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Loại pin
  if (filters.loaiPin) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const loaiPin = productSpecs["Lõi pin"];
        // Chuyển cả hai chuỗi về dạng chữ thường trước khi so sánh
        return (
          loaiPin &&
          loaiPin.toLowerCase().includes(filters.loaiPin.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Tiện ích pin
  if (filters.tienIchPin) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const tienIchPin = productSpecs["Công nghệ/Tiện ích"];
        return (
          tienIchPin &&
          tienIchPin.toLowerCase().includes(filters.tienIchPin.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Khối lượng
  if (filters.khoiLuong) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const khoiLuong = parseInt(productSpecs["Khối lượng"], 10); // Đảm bảo là số
        // Kiểm tra xem khoiLuong có nằm trong khoảng được chọn không
        return (
          khoiLuong &&
          khoiLuong >= filters.khoiLuong.min &&
          (!filters.khoiLuong.max || khoiLuong <= filters.khoiLuong.max)
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  // Xử lý bộ lọc cho Hiệu suất sạc
  if (filters.hieuSuatSac) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const hieuSuatSacStr = productSpecs["Hiệu suất sạc"];
        const hieuSuatSac = parseFloat(hieuSuatSacStr.replace("%", ""));
        return hieuSuatSac && hieuSuatSac <= filters.hieuSuatSac;
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  if (filters.dongSacToiDa) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const dongSacToiDaStr = productSpecs["Dòng sạc tối đa"];
        const dongSacToiDa = parseFloat(
          dongSacToiDaStr.replace("W", "").trim()
        );
        // So sánh giá trị "Dòng sạc tối đa" của sản phẩm với giá trị từ bộ lọc
        return dongSacToiDa && dongSacToiDa >= filters.dongSacToiDa;
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  if (filters.chatLieu) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const chatLieu = productSpecs["Chất liệu"];
        // Chuyển cả hai chuỗi về dạng chữ thường trước khi so sánh
        return (
          chatLieu &&
          chatLieu.toLowerCase().includes(filters.chatLieu.toLowerCase())
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }

  if (filters.trongLuong) {
    filteredProducts = filteredProducts.filter((product) => {
      try {
        const productSpecs = JSON.parse(product.spec);
        const trongLuong = parseInt(productSpecs["Trọng lượng"], 10); // Đảm bảo là số
        // Kiểm tra xem trongLuong có nằm trong khoảng được chọn không
        return (
          trongLuong &&
          trongLuong >= filters.trongLuong.min &&
          (!filters.trongLuong.max || trongLuong <= filters.trongLuong.max)
        );
      } catch (error) {
        console.error("Parsing error:", error);
        return false;
      }
    });
  }
  return filteredProducts;
}

// Hàm áp dụng sắp xếp
function applySort(products, sortOption) {
  switch (sortOption) {
    case "name-asc":
      return products.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return products.sort((a, b) => b.title.localeCompare(a.title));
    case "price-asc":
      return products.sort((a, b) => a.price - b.price);
    case "price-desc":
      return products.sort((a, b) => b.price - a.price);
    default:
      return products;
  }
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value; // Cập nhật trạng thái bộ lọc
      let filteredProducts = applyFilters(
        state.originalProducts,
        state.filters
      );
      state.products = applySort(filteredProducts, state.currentSort); // Áp dụng lại cả sắp xếp
    },
    resetFilter: (state, action) => {
      const { filterType } = action.payload;
      state.filters[filterType] = null; // Đặt lại bộ lọc cụ thể
      let filteredProducts = applyFilters(
        state.originalProducts,
        state.filters
      );
      state.products = applySort(filteredProducts, state.currentSort); // Áp dụng lại cả sắp xếp
    },
    setSort: (state, action) => {
      state.currentSort = action.payload; // Cập nhật trạng thái sắp xếp
      let sortedProducts = applySort([...state.products], state.currentSort); // Áp dụng sắp xếp trên danh sách hiện tại
      state.products = sortedProducts;
    },
    resetSort: (state) => {
      state.currentSort = null; // Đặt lại trạng thái sắp xếp
      // Không cần áp dụng lại sắp xếp vì đã đặt lại nó
      // Đảm bảo danh sách sản phẩm là danh sách đã lọc gần nhất
      state.products = applyFilters(state.originalProducts, state.filters);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProducts.pending, (state, action) => {
        state.productStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
        state.originalProducts = action.payload;
        state.products = action.payload;
        state.productsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncProducts.rejected, (state, action) => {
        state.productsStatus = STATUS.FAILED;
      })

      .addCase(fetchAsyncProductSingle.pending, (state, action) => {
        state.productSingleStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
        state.productSingle = action.payload;
        state.productSingleStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
        state.productSingleStatus = STATUS.FAILED;
      })
      .addCase(fetchAsyncSimilarProducts.pending, (state) => {
        state.similarProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.similarProductsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncSimilarProducts.rejected, (state) => {
        state.similarProductsStatus = STATUS.FAILED;
      });
  },
});

// for getting the products list with limited numbers
export const fetchAsyncProducts = createAsyncThunk(
  "products/fetch",
  async (limit) => {
    const response = await fetch(`${BASE_URL_2}products?limit=${limit}`);
    const data = await response.json();
    const filteredProducts = data.products.filter(
      product => !product.isDeleted === true
    );
    return filteredProducts;
  }
);

// getting the single product data also
export const fetchAsyncProductSingle = createAsyncThunk(
  "product-single/fetch",
  async (id) => {
    const response = await fetch(`${BASE_URL_2}products/${id}`);
    const data = await response.json();
    return data;
  }
);

// Tạo async thunk để lấy sản phẩm tương tự
export const fetchAsyncSimilarProducts = createAsyncThunk(
  "products/fetchSimilar",
  async (id) => {
    const response = await fetch(
      `${BASE_URL_2}products/same-products?id=${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch similar products");
    }
    const data = await response.json();
    return data.products; // Giả sử data trả về là mảng các sản phẩm tương tự
  }
);

export const getAllProducts = (state) => state.product.products;
export const getAllProductsStatus = (state) => state.product.productsStatus;
export const getProductSingle = (state) => state.product.productSingle;

export const {
  sortProducts,
  filterProductsByPriceRange,
  resetFiltersAndSorting,
  setFilter,
  resetFilter,
  setSort,
  resetSort,
} = productSlice.actions;

export const getProductSingleStatus = (state) =>
  state.product.productSingleStatus;

export default productSlice.reducer;
