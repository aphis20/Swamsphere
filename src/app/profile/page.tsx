// src/app/profile/page.tsx
"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { ProfileDisplay } from '@/components/profile/ProfileDisplay';
import { mockUserProfile } from '@/lib/mockData';
import { useHasMounted } from '@/hooks/useHydration';
import { LoadingPlaceholder } from '@/components/shared/LoadingPlaceholder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, UserPlus } from 'lucide-react';

export default function ProfilePage() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <LoadingPlaceholder text="Loading Profile..." />;
  }
  
  return (
    <>
      <PageHeader
        title="My Profile"
        description="Manage your decentralized identity, share updates, and recruit for your spheres."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProfileDisplay profile={mockUserProfile} />
        </div>
        <div className="md:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Social Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button className="w-full" variant="default">
                        <Share2 className="mr-2 h-4 w-4" /> Share Quest Victory
                    </Button>
                    <Button className="w-full" variant="outline">
                        <UserPlus className="mr-2 h-4 w-4" /> Recruit for Sphere
                    </Button>
                    <p className="text-xs text-muted-foreground text-center pt-2">Earn 5 SPHERE per referral!</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                   <ul className="text-sm text-muted-foreground space-y-2">
                       <li>Joined "GreenSphere Climate Action"</li>
                       <li>Completed "Annotate Urban Images" task</li>
                       <li>Earned 25 SPHERE</li>
                   </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
