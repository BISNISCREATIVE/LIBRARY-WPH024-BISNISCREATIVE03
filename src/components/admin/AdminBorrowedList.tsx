import { useState } from 'react';
import { Search, Calendar, User, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { dummyLoans } from '@/data/dummyData';

const AdminBorrowedList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLoans = dummyLoans.filter(loan => 
    loan.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loan.book.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'returned':
        return <Badge variant="secondary">Returned</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short', 
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <h2 className="text-2xl font-bold">Borrowed List</h2>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search borrowed books"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Desktop Table View */}
      <Card className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Borrower</TableHead>
              <TableHead>Borrowed Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Return Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLoans.map((loan) => (
              <TableRow key={loan._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={loan.book.cover}
                      alt={loan.book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{loan.book.title}</div>
                      <div className="text-sm text-muted-foreground">
                        by {loan.book.author.name}
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-xs">{loan.book.rating}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        <User className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">John Doe</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3 w-3" />
                    {formatDate(loan.borrowedAt)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3 w-3" />
                    {formatDate(loan.dueAt)}
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(loan.status)}
                </TableCell>
                <TableCell>
                  {loan.returnedAt ? (
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {formatDate(loan.returnedAt)}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredLoans.map((loan) => (
          <Card key={loan._id} className="p-4">
            <div className="flex gap-3 mb-4">
              <img
                src={loan.book.cover}
                alt={loan.book.title}
                className="w-16 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm mb-1">{loan.book.title}</h3>
                <p className="text-xs text-muted-foreground mb-1">
                  by {loan.book.author.name}
                </p>
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-xs">{loan.book.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Borrower:</span>
                <span>John Doe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Borrowed:</span>
                <span>{formatDate(loan.borrowedAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date:</span>
                <span>{formatDate(loan.dueAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status:</span>
                {getStatusBadge(loan.status)}
              </div>
              {loan.returnedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Returned:</span>
                  <span>{formatDate(loan.returnedAt)}</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredLoans.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No borrowed books found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default AdminBorrowedList;