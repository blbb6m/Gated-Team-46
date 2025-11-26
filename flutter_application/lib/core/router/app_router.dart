import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/wardrobe/presentation/wardrobe_page.dart';
import '../../features/brands/presentation/brands_page.dart';
import '../../features/orders/presentation/orders_page.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/wardrobe',
    routes: [
      GoRoute(
        path: '/wardrobe',
        builder: (context, state) => const WardrobePage(),
      ),
      GoRoute(
        path: '/brands',
        builder: (context, state) => const BrandsPage(),
      ),
      GoRoute(
        path: '/orders',
        builder: (context, state) => const OrdersPage(),
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      appBar: AppBar(title: const Text('Not found')),
      body: Center(child: Text(state.error?.toString() ?? 'Unknown error')),
    ),
  );
});
