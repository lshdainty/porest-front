import { apiClient } from '@/shared/api'
import type { ApiResponse } from '@/shared/types/api'
import type {
  GetUserResp,
  GetUsersResp,
  GetUserApproversResp,
  GetUserIdDuplicateResp,
  PostUserReq,
  PutUserReq,
  PutInvitedUserReq,
  PutInvitedUserResp,
  PostUserInviteReq,
  PostUserInviteResp,
  UpdateDashboardReq,
  UpdateDashboardResp,
  ResetPasswordReq,
  RequestPasswordResetReq,
  ChangePasswordReq,
} from '@/entities/user/model/types'

export const userApi = {
  getUser: async (userId: string): Promise<GetUserResp> => {
    const resp: ApiResponse<GetUserResp> = await apiClient.request({
      method: 'get',
      url: `/users/${userId}`
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  getUsers: async (): Promise<GetUsersResp[]> => {
    const resp: ApiResponse<GetUsersResp[]> = await apiClient.request({
      method: 'get',
      url: `/users`
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  getUserApprovers: async (userId: string): Promise<GetUserApproversResp> => {
    const resp: ApiResponse<GetUserApproversResp> = await apiClient.request({
      method: 'get',
      url: `/users/${userId}/approvers`
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  getUserIdDuplicate: async (userId: string): Promise<GetUserIdDuplicateResp> => {
    const resp: ApiResponse<GetUserIdDuplicateResp> = await apiClient.request({
      method: 'get',
      url: `/users/check-duplicate`,
      params: {
        user_id: userId
      }
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  postUser: async (data: PostUserReq): Promise<any> => {
    const resp: ApiResponse = await apiClient.request({
      method: 'post',
      url: `/users`,
      data
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  putUser: async (data: PutUserReq): Promise<any> => {
    const { user_id, ...rest } = data
    const resp: ApiResponse = await apiClient.request({
      method: 'put',
      url: `/users/${user_id}`,
      data: rest
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  putInvitedUser: async (data: PutInvitedUserReq): Promise<PutInvitedUserResp> => {
    const resp: ApiResponse<PutInvitedUserResp> = await apiClient.request({
      method: 'put',
      url: `/users/${data.user_id}/invitations`,
      data: {
        user_name: data.user_name,
        user_email: data.user_email,
        user_company_type: data.user_company_type,
        user_work_time: data.user_work_time,
        join_date: data.join_date,
        country_code: data.country_code
      }
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  deleteUser: async (userId: string): Promise<any> => {
    const resp: ApiResponse = await apiClient.request({
      method: 'delete',
      url: `/users/${userId}`
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  postUserInvite: async (data: PostUserInviteReq): Promise<PostUserInviteResp> => {
    const resp: ApiResponse<PostUserInviteResp> = await apiClient.request({
      method: 'post',
      url: `/users/invitations`,
      data
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  postUploadProfile: async (file: File): Promise<any> => {
    const formData = new FormData()
    formData.append('profile', file)

    const resp: ApiResponse = await apiClient.request({
      method: 'post',
      url: `/users/profiles`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  postResendInvitation: async (userId: string): Promise<any> => {
    const resp: ApiResponse = await apiClient.request({
      method: 'post',
      url: `/users/${userId}/invitations/resend`
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  updateDashboard: async (userId: string, data: UpdateDashboardReq): Promise<UpdateDashboardResp> => {
    const resp: ApiResponse<UpdateDashboardResp> = await apiClient.request({
      method: 'patch',
      url: `/users/${userId}/dashboard`,
      data
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  resetPassword: async (data: ResetPasswordReq): Promise<void> => {
    const resp: ApiResponse = await apiClient.request({
      method: 'patch',
      url: `/users/${data.user_id}/password`
    })

    if (!resp.success) throw new Error(resp.message)
  },

  // 비밀번호 초기화 요청 (비로그인)
  requestPasswordReset: async (data: RequestPasswordResetReq): Promise<void> => {
    const resp: ApiResponse = await apiClient.request({
      method: 'post',
      url: `/users/password/reset-request`,
      data
    })

    if (!resp.success) throw new Error(resp.message)
  },

  // 비밀번호 변경 (로그인 사용자)
  changePassword: async (data: ChangePasswordReq): Promise<void> => {
    const resp: ApiResponse = await apiClient.request({
      method: 'patch',
      url: `/users/me/password`,
      data
    })

    if (!resp.success) throw new Error(resp.message)
  },
}
