'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you shortly.',
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          We'd love to hear from you. Reach out with any questions, comments, or story tips.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
            <h2 className="font-headline text-3xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6 text-lg">
                <div className="flex items-start gap-4">
                    <MapPin className="h-8 w-8 text-primary mt-1" />
                    <div>
                        <h3 className="font-bold">Our Headquarters</h3>
                        <p className="text-muted-foreground">123 News Plaza, Media City, 54321</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Phone className="h-8 w-8 text-primary mt-1" />
                    <div>
                        <h3 className="font-bold">General Inquiries</h3>
                        <p className="text-muted-foreground">(555) 123-4567</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Mail className="h-8 w-8 text-primary mt-1" />
                    <div>
                        <h3 className="font-bold">Email Us</h3>
                        <p className="text-muted-foreground">
                            <a href="mailto:contact@falconnews.com" className="hover:underline">contact@falconnews.com</a>
                        </p>
                    </div>
                </div>
            </div>
            <Card className="mt-8">
                <CardContent className="p-0">
                     <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Map placeholder</p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <Card className="shadow-lg">
            <CardContent className="p-8">
                <h2 className="font-headline text-3xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" name="firstName" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" name="lastName" placeholder="Doe" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                         <Label htmlFor="email">Email Address</Label>
                         <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
                    </div>
                     <div className="space-y-2">
                         <Label htmlFor="subject">Subject</Label>
                         <Input id="subject" name="subject" placeholder="Regarding your article on..." required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" placeholder="Your message here..." required className="min-h-[150px]" />
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                        Send Message
                    </Button>
                </form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
