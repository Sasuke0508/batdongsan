import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Input, Label } from 'reactstrap';
import { userService } from '../../services';
import SelectAddress from '../core/SelectAddress';
import { settingsDispatch } from '../../store/slices/settingsSlice';
import { getAddressName } from '../../utils';
import { tokenDispatch } from '../../store/slices/tokenSlice';
import { CloudArrowUp } from 'react-bootstrap-icons';
import { uploadImage } from '../core/firebase';

function UserSettings(props) {

    const dispatch = useDispatch();
    const user = useSelector(store => store.tokenSlice.user);
    const [ userInfo, setUserInfo ] = useState(user?.systemUser);
    const [ address, setAddress ] = useState(user?.systemUser?.address || {});
    const [ avatar, setAvatar ] = useState(user?.systemUser?.avatar);

    const handleUserInfo = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleUploadFiles = async (file) => {
        if (!file) return;
        const result = await uploadImage(file);
        setAvatar(result);
    };

    const handelUpdateUserInfo = async () => {
        try {
            await userService.updateUserInfo({
                ...userInfo,
                avatar: avatar,
                address: {
                    id: address.id,
                    wardId: address.ward,
                    provinceId: address.city,
                    districtId: address.district,
                    addressDetail: address.number,
                    ...(await getAddressName(address))
                },
            });
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: false,
                    content: 'Cập nhật thông tin thành công'
                })
            );
            dispatch(
                tokenDispatch.updateUserInfo({
                    ...userInfo,
                    address,
                    avatar: avatar,
                })
            )
        } catch(err) {
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: true,
                    content: err.message,
                })
            )
        }
    }

    return (
        <div className="page-container-md">
            <Card className="mt-3 p-4">
                <h5>Thông tin người dùng</h5>
                <div>
                    <Label for="create-post-upload" className="create-post-upload__label d-flex flex-column align-items-center cursor-pointer p-4">
                        {
                            !avatar
                            ?
                            <>
                                <CloudArrowUp size={50} />
                                <div>Bấm để chọn ảnh cần tải lên</div>
                                <div className="opacity-75">hoặc kéo thả ảnh vào đây</div>
                            </>
                            : 
                                <img className='mw-100' src={avatar} alt="avatar"/>
                        }
                    </Label>
                    <Input
                        className="d-none"
                        id="create-post-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadFiles(e.target.files?.[0])}
                    />
                </div>
                <div className="mt-2">
                    <div className="mt-2">
                        <h6 className="required">
                            Họ và tên
                        </h6>
                        <Input 
                            placeholder='Nhập họ và tên'
                            name='fullName'
                            value={userInfo?.fullName ?? ''}
                            onChange={handleUserInfo}
                        />
                    </div>
                    <SelectAddress address={address} setAddress={setAddress} />
                </div>

                <div className="mt-2">
                    <h6 className="required">
                        Email
                    </h6>
                    <Input
                        disabled={user?.systemUser?.email}
                        type='email'
                        placeholder='Nhập email'
                        name='email'
                        value={userInfo?.email ?? ''}
                        onChange={handleUserInfo}
                    />
                </div>

                <div className="mt-2">
                    <h6 className="required">
                        Giới tính
                    </h6>
                    <div className='d-flex'>
                        <div>
                            <Input 
                                type='radio'
                                name='gender'
                                value='MALE'
                                checked={userInfo?.gender === 'MALE'}
                                onChange={handleUserInfo}
                            />
                            <Label check>Nam</Label>
                        </div>
                        <div>
                            <Input 
                                type='radio'
                                name='gender'
                                value='FEMALE'
                                checked={userInfo?.gender === 'FEMALE'}
                                onChange={handleUserInfo}
                            />
                            <Label check>Nữ</Label>
                        </div>
                    </div>
                </div>

                <div className="mt-2">
                    <h6 className="required">
                        Số điện thoại
                    </h6>
                    <Input
                        disabled={user?.systemUser?.phoneNumber}
                        placeholder='Nhập số điện thoại'
                        name="phoneNumber"
                        value={userInfo?.phoneNumber ?? ''}
                        onChange={handleUserInfo}
                    />
                </div>

                <div className="mt-2">
                    <h6 className="required">
                        CMT/CCCD
                    </h6>
                    <Input 
                        placeholder='Nhập giấy tờ tùy thân'
                        value={userInfo?.identityNumber ?? ''}
                        name="identityNumber"
                        onChange={handleUserInfo}
                    />
                </div>

                <div className="mt-2">
                    <h6 className="required">
                        Ngày sinh
                    </h6>
                    <Input 
                        type='date'
                        placeholder='Nhập ngày sinh'
                        name="dob"
                        value={userInfo?.dob || ''}
                        onChange={handleUserInfo}
                    />
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <h5>Thông tin tài khoản</h5>
                <div className="mt-2">
                    <h6 className="required">
                        Tên đăng nhập
                    </h6>
                    <Input
                        disabled
                        fullwidth="true"
                        placeholder="Tên đăng nhập"
                        defaultValue={user?.username ?? ''}
                    />
                </div>
                <div className="mt-2">
                    <h6 className="required">
                        Trạng thái
                    </h6>
                    <Input
                        fullwidth="true"
                        disabled
                        defaultValue="Đã kích hoạt"
                    />
                </div>

                <div className="mt-2">
                    <h6 className="required">
                        Chức vụ
                    </h6>
                    <Input
                        fullwidth="true"
                        disabled
                        defaultValue={user?.role === 'ROLE_USER' ? 'Người dùng' : 'Quản trị viên'}
                    />
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <h5>Thông tin số dư</h5>
                <div className="mt-2">
                    <h6 className="required">
                        Mã chuyển tiền
                    </h6>
                    <Input 
                        disabled
                        fullwidth="true"
                        defaultValue={userInfo?.transferCode ?? ''}
                    />
                </div>

                <div className="mt-2">
                    <h6 className="required">
                        Số dư
                    </h6>
                    <Input 
                        disabled
                        fullwidth="true" 
                        defaultValue={userInfo?.balance ?? 0}
                    />
                </div>

                <div className="mt-2">
                    <h6 className="required">
                        Điểm tích lũy
                    </h6>
                    <Input 
                        disabled
                        fullwidth="true"
                        defaultValue={userInfo?.accumulatedPoint ?? 0}
                    />
                </div>
               
            </Card>
            <Card className="my-3 p-4">
                <div className="d-flex justify-content-center align-items-center">
                    <Button color="danger" type="submit" onClick={handelUpdateUserInfo}>
                        Cập nhật
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default UserSettings;