// src/components/profile/ProfileDisplay.tsx
import type { UserProfile } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit3, MapPin, Brain, Smartphone, Gem, Link as LinkIcon, Users } from 'lucide-react';

interface ProfileDisplayProps {
  profile: UserProfile;
}

export function ProfileDisplay({ profile }: ProfileDisplayProps) {
  return (
    <Card className="shadow-xl">
      <CardHeader className="items-center text-center">
        <Avatar className="w-24 h-24 mb-4 border-4 border-primary ring-2 ring-primary/50">
          <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint="profile picture" />
          <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">{profile.name}</CardTitle>
        <CardDescription className="flex items-center justify-center text-sm">
          <Gem className="w-4 h-4 mr-1 text-accent" /> {profile.swarmPoints.toLocaleString()} Swarm Points
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Bio</h3>
          <p className="text-sm text-muted-foreground">{profile.bio}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-foreground">Details</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <span className="text-muted-foreground">Location:</span>&nbsp;
              <span className="text-foreground">{profile.location}</span>
            </li>
            <li className="flex items-center">
              <Smartphone className="w-4 h-4 mr-2 text-primary" />
              <span className="text-muted-foreground">Device:</span>&nbsp;
              <span className="text-foreground">{profile.deviceCapabilities}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-foreground">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(skill => (
              <Badge key={skill} variant="secondary" className="flex items-center">
                <Brain className="w-3 h-3 mr-1" /> {skill}
              </Badge>
            ))}
          </div>
        </div>

        {profile.joinedSpheres.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Joined Spheres</h3>
            <div className="flex flex-wrap gap-2">
              {profile.joinedSpheres.map(sphereId => ( // In real app, fetch sphere names
                <Badge key={sphereId} variant="outline" className="flex items-center">
                   <Users className="w-3 h-3 mr-1" /> Sphere {sphereId.slice(-4)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {(profile.socialLinks?.lens || profile.socialLinks?.twitter) && (
            <div>
                <h3 className="font-semibold mb-2 text-foreground">Social Links</h3>
                <div className="flex flex-wrap gap-2">
                    {profile.socialLinks.lens && (
                         <Button variant="link" size="sm" asChild className="p-0 h-auto">
                            <a href={`https://lenster.xyz/u/${profile.socialLinks.lens}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <LinkIcon className="w-3 h-3 mr-1" /> {profile.socialLinks.lens} (Lens)
                            </a>
                        </Button>
                    )}
                    {profile.socialLinks.twitter && (
                        <Button variant="link" size="sm" asChild className="p-0 h-auto">
                            <a href={`https://twitter.com/${profile.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <LinkIcon className="w-3 h-3 mr-1" /> @{profile.socialLinks.twitter}
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        )}

      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
