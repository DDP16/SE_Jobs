import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../modules/services/userService';
import { getCompany } from '../modules/services/companyService';
import { Role } from '../lib/enums';

/**
 * Custom Hook: Auto-fetch User Profile Based on Role
 * 
 * This hook automatically fetches the appropriate profile data when a user logs in,
 * based on their role (Student, Employer, or Admin).
 * 
 * @returns {Object} Profile data object containing:
 *   - profileData: The user/company profile data (includes student_info for Students)
 *   - isLoading: Boolean indicating if data is currently being fetched
 *   - error: Any error message from the API call
 *   - profileType: String indicating the type ('student', 'company', or 'admin')
 * 
 * @example
 * const { profileData, isLoading, error, profileType } = useUserProfile();
 * 
 * // For Students: profileData includes user fields + student_info object
 * const studentInfo = profileData?.student_info;
 * 
 * // For Employers: profileData is company data
 * const companyName = profileData?.company_name;
 * 
 * // For Admins: profileData is basic user data from auth
 * const adminName = profileData?.name;
 * 
 * Behavior by Role:
 * - STUDENT: Fetches from /api/users/:id (backend auto-joins student_info via joinData)
 * - EMPLOYER: Fetches from /api/companies/:id (gets company profile)
 * - ADMIN: No additional fetch needed (uses auth user data from getMe())
 */
export const useUserProfile = () => {
    const dispatch = useDispatch();
    
    // Get authentication state from Redux
    const { user: authUser, userId, userRole, isAuthenticated } = useSelector((state) => state.auth);
    
    // Get profile data from appropriate Redux slice based on role
    const userProfile = useSelector((state) => state.user?.user);
    const companyProfile = useSelector((state) => state.company?.company);
    
    // Get loading status for each profile type
    const userStatus = useSelector((state) => state.user?.status);
    const companyStatus = useSelector((state) => state.company?.status);

    // Auto-fetch profile data when user is authenticated
    useEffect(() => {
        // Exit early if user is not authenticated or missing required auth data
        if (!isAuthenticated || !userId || !userRole) return;

        const role = userRole?.toLowerCase();
        
        // STUDENT: Fetch user profile (BE automatically joins student_info)
        if (role === Role.STUDENT.toLowerCase()) {
            // Only fetch if we don't have data yet or status is idle
            if (!userProfile || userStatus === 'idle') {
                dispatch(getUserById(userId));
            }
        }
        
        // EMPLOYER: Fetch company profile
        else if (role === Role.EMPLOYER.toLowerCase()) {
            // Only fetch if we don't have company data yet or status is idle
            if (!companyProfile || companyStatus === 'idle') {
                dispatch(getCompany(userId));
            }
        }
        
        // ADMIN: No additional fetch needed, basic user data from getMe() is sufficient
        
    }, [isAuthenticated, userId, userRole, userProfile, companyProfile, userStatus, companyStatus, dispatch]);

    // Helper function to return appropriate data based on role
    const getProfileData = () => {
        const role = userRole?.toLowerCase();
        
        // Return student profile with student_info
        if (role === Role.STUDENT.toLowerCase()) {
            return {
                profileData: userProfile,
                isLoading: userStatus === 'loading',
                error: useSelector((state) => state.user?.error),
                profileType: 'student'
            };
        }
        
        // Return company profile
        if (role === Role.EMPLOYER.toLowerCase()) {
            return {
                profileData: companyProfile,
                isLoading: companyStatus === 'loading',
                error: useSelector((state) => state.company?.error),
                profileType: 'company'
            };
        }
        
        // Return admin basic data (no additional profile needed)
        return {
            profileData: authUser,
            isLoading: false,
            error: null,
            profileType: 'admin'
        };
    };

    return getProfileData();
};
