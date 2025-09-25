import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RootState } from '@/store';
import { clearCart } from '@/store/slices/uiSlice';
import { loansAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { cartItems } = useSelector((state: RootState) => state.ui);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerEmail: '',
    borrowerPhone: '',
    borrowPeriod: '30'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = async () => {
    if (!formData.borrowerName || !formData.borrowerEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Process each book in cart
      for (const item of cartItems) {
        await loansAPI.borrowBook(item._id);
      }
      
      // Clear cart and navigate to success
      dispatch(clearCart());
      navigate('/success');
      
      toast({
        title: "Success!",
        description: "Books borrowed successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to borrow books",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some books to your cart before checking out.
          </p>
          <Button onClick={() => navigate('/')}>
            Browse Books
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto p-4 max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {cartItems.map((book) => (
                  <div key={book._id} className="flex gap-4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {book.author.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {book.category.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Number of Books:</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Borrow Period:</span>
                  <span>30 days</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Late Fee (if returned late):</span>
                  <span>$1.00/day</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Borrower Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Borrower Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="borrowerName">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="borrowerName"
                      name="borrowerName"
                      value={formData.borrowerName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="borrowerEmail">Email Address *</Label>
                  <Input
                    id="borrowerEmail"
                    name="borrowerEmail"
                    type="email"
                    value={formData.borrowerEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="borrowerPhone">Phone Number</Label>
                  <Input
                    id="borrowerPhone"
                    name="borrowerPhone"
                    value={formData.borrowerPhone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="borrowPeriod">Borrow Period (days)</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="borrowPeriod"
                      name="borrowPeriod"
                      type="number"
                      value={formData.borrowPeriod}
                      onChange={handleInputChange}
                      className="pl-10"
                      min="1"
                      max="90"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-medium">Library Terms</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Books must be returned by the due date</p>
                  <p>• Late fees apply for overdue books</p>
                  <p>• Damaged books will incur replacement costs</p>
                  <p>• Maximum of 5 books per borrower</p>
                </div>
              </div>

              <Button 
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full mt-6"
                size="lg"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {isLoading ? 'Processing...' : 'Confirm Borrow'}
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;