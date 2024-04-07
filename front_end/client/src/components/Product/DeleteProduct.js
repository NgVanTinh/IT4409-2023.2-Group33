// SweetAlert2
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function DeleteProduct(props) {
  const { item, onReload } = props;
  const handleDelete = () => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa không?",
      text: "Nếu xóa thì không thể khôi phục!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3002/products/${item.id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then(() => {
            onReload(); // reload page
            Swal.fire({
              title: "Đã xóa!",
              text: "Bạn đã xóa thành công",
              icon: "success",
            });
          });
      }
    });
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
export default DeleteProduct;
