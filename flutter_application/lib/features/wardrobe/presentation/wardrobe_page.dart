import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/repositories/wardrobe_repository.dart';

final wardrobeProvider =
    FutureProvider.autoDispose<List<Map<String, dynamic>>>((ref) async {
  final repo = WardrobeRepository();
  return repo.fetchItems();
});

class WardrobePage extends ConsumerWidget {
  const WardrobePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final items = ref.watch(wardrobeProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Wardrobe')),
      body: items.when(
        data: (list) => ListView.separated(
          itemCount: list.length,
          separatorBuilder: (_, __) => const Divider(height: 1),
          itemBuilder: (_, i) => ListTile(
            leading: const Icon(Icons.checkroom_outlined),
            title: Text(list[i]['name']?.toString() ?? 'Item ${i + 1}'),
            subtitle: Text(list[i]['category']?.toString() ?? 'Unknown'),
          ),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('Error: $e')),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        icon: const Icon(Icons.add),
        label: const Text('Add Item'),
      ),
    );
  }
}
