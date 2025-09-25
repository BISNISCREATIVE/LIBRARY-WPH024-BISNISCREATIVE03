import { useState } from 'react';
import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { dummyUsers } from '@/data/dummyData';

const AdminUserList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = dummyUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <h2 className="text-2xl font-bold">User</h2>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Desktop Table View */}
      <Card className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Nomor Handphone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      {user.role === 'admin' && (
                        <Badge variant="secondary" className="text-xs">
                          Admin
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>28 Aug 2025, 14:00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user, index) => (
          <Card key={user._id} className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">No</span>
                <span className="font-medium">{index + 1}</span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Name</span>
                <div className="text-right">
                  <div className="font-medium">{user.name}</div>
                  {user.role === 'admin' && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="font-medium text-right">{user.email}</span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Nomor Handphone</span>
                <span className="font-medium">{user.phone}</span>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Created at</span>
                <span className="font-medium">28 Aug 2025, 14:00</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 1 to 10 of 60 entries
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Previous</span>
          <div className="flex space-x-1">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 text-sm rounded ${
                  page === 1 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-3 py-1 text-sm text-muted-foreground">...</span>
          </div>
          <span className="text-sm text-muted-foreground">Next</span>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No users found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;