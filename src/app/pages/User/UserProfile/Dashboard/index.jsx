import React from 'react';
import Dashboard from './Dashboard';
import UserProfileLayout from '../UserProfileLayout';

export default function DashboardPage() {
	return (
		<UserProfileLayout>
			<Dashboard />
		</UserProfileLayout>
	);
}
