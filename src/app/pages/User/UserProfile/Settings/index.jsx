import React from 'react';
import UserProfileSettings from './Settings';
import UserProfileLayout from '../UserProfileLayout';

export default function SettingsPage() {
	return (
		<UserProfileLayout>
			<UserProfileSettings />
		</UserProfileLayout>
	);
}