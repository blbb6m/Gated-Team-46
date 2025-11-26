import 'package:dio/dio.dart';
import '../services/api_client.dart';

class BrandsRepository {
  final Dio _dio = ApiClient.dio;

  Future<List<String>> fetchFavorites() async {
    final res = await _dio.get('/brands/favorites');
    return (res.data as List).cast<String>();
  }
}
