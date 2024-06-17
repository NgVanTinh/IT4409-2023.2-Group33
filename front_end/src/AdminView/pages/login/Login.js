import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {Form, Input} from "antd";
import "./AdminLogin.scss";
import {toast, ToastContainer} from "react-toastify"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";
function Login() {
    const navigate = useNavigate();
    const handleOnFinishLogin = async (values) => {
        await axios.post('https://buckytank.shop/auth/login', values)
        .then(result => {
            const data = result.data;
            console.log(data)
            if(data.id === 1){
                localStorage.setItem('token', data.token)
                navigate('/admin')
            }
            else {
                toast.info('Đăng nhập thất bại', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            }
        })
        .catch(err => {
            toast.info('Đăng nhập thất bại', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        })
        
    };

    return (
        <div className="admin-body">
        <div class="admin-form-login">
            <div class="admin-left">
            <h2>Đăng nhập</h2>
            <Form
                name="login-form"
                className="login-form"
                initialValues={{
                remember: true,
                }}
                layout="vertical"
                onFinish={handleOnFinishLogin}
            >
                <Form.Item
                label="Tài khoản"
                name="username"
                rules={[
                    {
                    required: true,
                    message: "Vui lòng nhập vào tên tài khoản!",
                    },
                ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                    {
                    required: true,
                    message: "Vui lòng nhập vào mật khẩu!",
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item>
                <button type="submit">Đăng nhập</button>
                </Form.Item>
            </Form>
            <Button
                variant="contained"
                onClick={() => navigate(`/`)}
            > 
                <ArrowBackIcon/> 
                Quay lại trang dành cho người dùng
            </Button>
            </div>
            <div class="admin-right">
            <h3>TShop</h3>
            <p>
                Chào mừng đến với trang quản trị của TShop - Nơi cung cấp 
                những chức năng quản lý website bán hàng nhanh chóng, hiệu quả
                <br />
            </p>
            </div>
        </div>
        <ToastContainer/>
        </div>
    );
}
export default Login;
