update orders
     set items = JSON_REPLACE(items, '$[4]', JSON_OBJECT('name', 'John', 'age', 30, 'city', 'New York')) where orderId = 'L_cGcW_8';