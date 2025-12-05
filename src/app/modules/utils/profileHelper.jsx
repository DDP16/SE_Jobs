import { getUserById } from '../services/userService';
import { getCompany } from '../services/companyService';
import { Role } from '@/lib/enums';

/**
 * Profile Helper: Fetch User Profile Based on Role
 * 
 * This helper function is used to fetch the appropriate profile data after login
 * or when profile data needs to be refreshed. It routes the fetch request based
 * on the user's role.
 * 
 * @param {Function} dispatch - Redux dispatch function from useDispatch()
 * @param {String} userId - The authenticated user's ID
 * @param {String} userRole - The user's role ('Student', 'Employer', or 'Admin')
 * @returns {Promise} Promise that resolves with the fetched profile data
 * 
 * @example
 * // In SignIn.jsx after successful login:
 * const dispatch = useDispatch();
 * await fetchProfileByRole(dispatch, userId, userRole);
 * 
 * Role-based Behavior:
 * - STUDENT: Calls getUserById() → returns user + student_info (backend auto-joins via joinData)
 * - EMPLOYER: Calls getCompany() → returns company profile data
 * - ADMIN: No fetch needed → admin only needs basic user data from getMe()
 * 
 * Backend Note:
 * For Student role, the backend's getUserById method automatically joins student_info
 * using the joinData utility, so a single API call returns all necessary data.
 */
export const fetchProfileByRole = async (dispatch, userId, userRole) => {
    // Validate required parameters
    if (!userId || !userRole) {
        console.warn('fetchProfileByRole: Missing userId or userRole');
        return null;
    }

    const role = userRole.toLowerCase();

    try {
        // STUDENT: Fetch user profile with auto-joined student_info
        if (role === Role.STUDENT.toLowerCase()) {
            const result = await dispatch(getUserById(userId));
            return result;
        }
        
        // EMPLOYER: Fetch company profile
        else if (role === Role.EMPLOYER.toLowerCase()) {
            const result = await dispatch(getCompany(userId));
            return result;
        }
        
        // ADMIN: No additional fetch needed (basic user data from getMe is sufficient)
        else if (role === Role.ADMIN.toLowerCase()) {
            console.log('Admin user - no additional profile data needed');
            return null;
        }
        
        // Unknown role handling
        else {
            console.warn(`Unknown role: ${userRole}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching profile by role:', error);
        throw error;
    }
};

/**
 * Clear profile data when logout
 */
export const clearProfileData = (dispatch) => {
    // Import actions if need
    // dispatch(clearStudentProfile());
    // dispatch(clearCompanyProfile());
};
