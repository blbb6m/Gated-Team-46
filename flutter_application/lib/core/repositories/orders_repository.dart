import 'package:dio/dio.dart';
import '../services/api_client.dart';

class OrdersRepository {
  final Dio _dio = ApiClient.dio;

  Future<List<Map<String, dynamic>>> fetchOrders() async {
    final res = await _dio.get('/orders');
    return (res.data as List).cast<Map<String, dynamic>>();
  }
}
