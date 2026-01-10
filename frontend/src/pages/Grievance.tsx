import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Grievance() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Grievance Redressal</h1>
        <p className="text-lg text-muted-foreground mb-12">
          We value your feedback and are committed to resolving any concerns promptly and fairly.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Speak directly with our grievance team
                </p>
                <p className="font-medium">1800-XXX-XXXX</p>
                <p className="text-sm text-muted-foreground">Mon-Sat, 9 AM - 6 PM</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Send us your detailed complaint
                </p>
                <p className="font-medium">grievance@loansbuzz.com</p>
                <p className="text-sm text-muted-foreground">Response within 48 hours</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Grievance Redressal Process</h2>
          
          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Submit Your Complaint</h3>
                  <p className="text-muted-foreground">
                    Contact us via phone, email, or the form below with details of your grievance. Include your reference number if available.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-secondary">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Acknowledgment</h3>
                  <p className="text-muted-foreground">
                    You will receive an acknowledgment within 24 hours with a unique complaint ID for tracking.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Investigation</h3>
                  <p className="text-muted-foreground">
                    Our team will investigate your complaint and may contact you for additional information.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-secondary">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Resolution</h3>
                  <p className="text-muted-foreground">
                    We aim to resolve all complaints within 7 working days. You will be informed of the outcome and any actions taken.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-8 bg-muted/30 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Submit a Grievance</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Reference Number (Optional)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="LB-XXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Complaint Details</label>
              <textarea 
                rows={6}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Please describe your grievance in detail..."
              ></textarea>
            </div>

            <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 w-full md:w-auto">
              Submit Grievance
            </Button>
          </form>
        </Card>

        <div className="bg-muted/20 rounded-lg p-6">
          <h3 className="font-semibold mb-3">Escalation Matrix</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you are not satisfied with the resolution, you may escalate to:
          </p>
          <div className="space-y-2 text-sm">
            <p><strong>Grievance Officer:</strong> Mr. [Name]</p>
            <p><strong>Email:</strong> grievanceofficer@loansbuzz.com</p>
            <p><strong>Address:</strong> [Complete Address]</p>
          </div>
        </div>
      </div>
    </div>
  );
}
