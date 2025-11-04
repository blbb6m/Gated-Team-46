import 'package:dio/dio.dart';
import '../services/api_client.dart';

class WardrobeRepository {
  final Dio _dio = ApiClient.dio;

  Future<List<Map<String, dynamic>>> fetchItems() async {
    final res = await _dio.get('/wardrobe');
    return (res.data as List).cast<Map<String, dynamic>>();
  }
}
