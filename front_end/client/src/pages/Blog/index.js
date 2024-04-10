import { Outlet } from "react-router-dom";

function Blog() {
  return (
    <>
      <h2>Blog page</h2>
      <Outlet />
    </>
  );
}
export default Blog;
