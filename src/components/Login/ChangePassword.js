import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import useForm from "../../hooks/useForm";
import { authService } from "../../services";
import { settingsDispatch } from "../../store/slices/settingsSlice";

function ChangePassword({setViewMode, encodedUsername, isForgotPassword=false}) {

    const { search } = useLocation();
    const navigate = useNavigate();
    const urlQuery = useMemo(() => {
        return new URLSearchParams(search)
    }, [search]);

    const dispatch = useDispatch();
    const changePassword = useForm({
        username: urlQuery.get('username'),
        currentPassword: '',
        newPassword: '',
        reNewPassword: '',
        date: urlQuery.get('date')

    });

    const handleChangePassword = async () => {
        try {
            await authService.changePassword(changePassword.data, isForgotPassword)
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: false,
                    content: 'Đổi mật khẩu thành công',
                })
            );
            navigate('/login');
        } catch(err) {
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: true,
                    content: err.message
                })
            )
        }
    }

    return (
        <div className="p-4">
            <h5>Thay đổi mật khẩu</h5>
            { !isForgotPassword 
                && <Input 
                        className="mt-3" 
                        type="password" 
                        placeholder="Mật khẩu cũ" 
                        name="currentPassword"
                        value={changePassword.currentPassword}
                        onChange={changePassword.onChange}
                    />}
            <Input 
                className="mt-3" 
                type="password" 
                placeholder="Mật khẩu mới" 
                name="newPassword" 
                value={changePassword.newPassword}
                onChange={changePassword.onChange}
            />
            <Input 
                className="mt-3" 
                type="password" 
                placeholder="Nhập lại khẩu mới"
                name="reNewPassword" 
                value={changePassword.reNewPassword}
                onChange={changePassword.onChange}
            />
            <Button className="w-100 mt-3" primary="true" onClick={handleChangePassword}>
                Xác nhận
            </Button>
        </div>
    );
}

export default ChangePassword;
