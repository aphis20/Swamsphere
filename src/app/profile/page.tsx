
// src/app/profile/page.tsx
"use client";

import { useState, useEffect, type ElementType } from 'react';
import type { UserProfile, Achievement } from '@/types';
import { PageHeader } from '@/components/shared/PageHeader';
import { ProfileDisplay } from '@/components/profile/ProfileDisplay';
import { mockUserProfile } from '@/lib/mockData'; // Keep for other uses for now
import { useHasMounted } from '@/hooks/useHydration';
import { LoadingPlaceholder } from '@/components/shared/LoadingPlaceholder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, UserPlus, Award, Users, Star, ShieldCheck, Trophy } from 'lucide-react';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";


const iconMap: { [key: string]: ElementType } = {
  Award,
  Users,
  Star,
  ShieldCheck,
  Trophy,
};


export default function ProfilePage() {
  const hasMounted = useHasMounted();
  const { user, loading: authLoading } = useAuthStatus();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && user && hasMounted) {
      const fetchProfile = async () => {
        setIsLoadingProfile(true);
        if (!user.uid) {
          console.error("User UID is not available.");
          setIsLoadingProfile(false);
          setProfile(null); // Or some error state
          return;
        }
        const profileDocRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(profileDocRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            // Profile doesn't exist, create a new one
            const newProfile: UserProfile = {
              id: user.uid,
              name: user.displayName || user.email || "New User",
              email: user.email || "", // Add email field to UserProfile type if not present
              avatarUrl: user.photoURL || `https://placehold.co/100x100.png?text=${(user.displayName || user.email || "U")[0].toUpperCase()}`,
              bio: "Welcome to SwarmSphere! Tell us about yourself.",
              skills: [],
              location: "Not specified",
              deviceCapabilities: "Not specified",
              swarmPoints: 0,
              level: 1,
              levelProgressPercent: 0,
              joinedSpheres: [],
              achievements: [],
              // @ts-ignore
              createdAt: serverTimestamp(),
              // @ts-ignore
              updatedAt: serverTimestamp(),
            };
            await setDoc(profileDocRef, newProfile);
            setProfile(newProfile);
            toast({
              title: "Profile Created",
              description: "Welcome! Your basic profile has been set up.",
            });
          }
        } catch (error) {
          console.error("Error fetching/creating profile:", error);
          toast({
            title: "Error",
            description: "Could not load or create your profile.",
            variant: "destructive",
          });
          setProfile(null); // Or set to an error state / fallback
        } finally {
          setIsLoadingProfile(false);
        }
      };
      fetchProfile();
    } else if (!authLoading && !user && hasMounted) {
      // User is not logged in, AuthProvider should redirect, but good to handle
      setIsLoadingProfile(false);
      setProfile(null);
    }
  }, [user, authLoading, hasMounted, toast]);

  if (!hasMounted || authLoading || isLoadingProfile) {
    return <LoadingPlaceholder text="Loading Profile..." />;
  }

  if (!profile) {
    return (
      <>
        <PageHeader title="My Profile" description="Could not load profile information." />
        <p>There was an issue loading your profile. Please try again later or ensure you are logged in.</p>
      </>
    );
  }
  
  return (
    <>
      <PageHeader
        title="My Profile"
        description="Manage your decentralized identity, share updates, and recruit for your spheres."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProfileDisplay profile={profile} />
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
                       {/* This should eventually come from user's activity log in Firestore */}
                       <li>Joined "GreenSphere Climate Action" (Example)</li>
                       <li>Completed "Annotate Urban Images" task (Example)</li>
                       <li>Earned 25 SPHERE (Example)</li>
                   </ul>
                </CardContent>
            </Card>
            {profile.achievements && profile.achievements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {profile.achievements.map((ach: Achievement) => {
                      const IconComponent = iconMap[ach.iconName] || Award; // Default to Award icon
                      return (
                        <li key={ach.id} className="flex items-center text-sm">
                          <IconComponent className="w-5 h-5 mr-3 text-primary" />
                          <span className="text-foreground font-medium">{ach.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            )}
            {(!profile.achievements || profile.achievements.length === 0) && (
                 <Card>
                    <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">No achievements unlocked yet. Keep engaging!</p>
                    </CardContent>
                 </Card>
            )}
        </div>
      </div>
    </>
  );
}
