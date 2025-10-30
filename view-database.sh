#!/bin/bash

echo "========================================="
echo "   Coffee Haven Database Viewer"
echo "========================================="
echo ""

echo "Connecting to MongoDB..."
echo ""

# View database statistics
mongosh mongodb://localhost:27017/cafe_oli --quiet --eval "
  print('Database: cafe_oli');
  print('');
  print('Collections:');
  db.getCollectionNames().forEach(function(col) {
    print('  - ' + col + ' (' + db[col].countDocuments() + ' documents)');
  });
  print('');
  print('========================================');
  print('USERS:');
  print('========================================');
  db.users.find().forEach(function(user) {
    print('');
    print('Name: ' + user.name);
    print('Email: ' + user.email);
    print('Phone: ' + user.phone);
    print('Address: ' + user.address);
    print('Created: ' + user.createdAt);
    print('---');
  });
  print('');
  print('========================================');
  print('ORDERS:');
  print('========================================');
  db.orders.find().forEach(function(order) {
    print('');
    print('Order ID: ' + order._id);
    print('Customer: ' + order.userName);
    print('Email: ' + order.userEmail);
    print('Status: ' + order.status);
    print('Total: ₹' + Math.round(order.total));
    print('Date: ' + order.orderDate);
    print('Items:');
    order.items.forEach(function(item) {
      print('  - ' + item.name + ' x' + item.quantity + ' (₹' + item.price + ')');
    });
    print('---');
  });
"

echo ""
echo "========================================="
echo "Done!"
echo "========================================="
