<script setup>
import BookCard from "./BookCard.vue" 
import BookService from "../services/book.service";
import { onBeforeMount, onMounted, reactive, ref, nextTick} from "vue";
import PublisherService from "@/services/publisher.service";
import CategoryService from "@/services/category.service";


const bookService = new BookService() 
const publisherService = new PublisherService()
const categoryService = new CategoryService()

const searchedBooks = ref()
const books = ref()
const keyWord = ref('')

// Hàm lấy tên nhà xuất bản từ publisherService
async function getPublisherName(publisherId) {
  try {
    const publisher = await publisherService.getPublisher(publisherId);
    return publisher?.publisherName || "Unknown Publisher";
  } catch (error) {
    console.error("Error fetching publisher:", error);
    return "Không rõ";
  }
}
async function getCategoryName(categoryId) {
  try {
    const category = await categoryService.getCategoryById(categoryId);
    return category?.categoryName || "Không rõ";
  } catch (error) {
    console.error("Error fetching publisher:", error);
    return "Unknown Category";
  }
}
// Hàm lấy tất cả sách và cập nhật `publisherName`
async function getAllBooks() {
  books.value = await bookService.getAllBooks();

  // Duyệt qua từng sách và lấy `publisherName`
  for (const book of books.value) {
    if (book.publisher) {
      book.publisherName = await getPublisherName(book.publisher);
      book.categoryName = await getCategoryName(book.categories);
    }
  }

  searchedBooks.value = books.value;
  console.log("Books with publishers:", books.value);
}




async function deleteBook(id) {
    try {
        // console.log(id);
        const result = await bookService.deleteBook(id)
        await getAllBooks()
    } catch (err) {

    }
}

function search() {
    if (!keyWord.value) {
        searchedBooks.value = books.value
        return
    }
    keyWord.value = keyWord.value.trim().toLowerCase()
    searchedBooks.value = books.value.filter((book) => book.title.toLowerCase().includes(keyWord.value))
}

async function clear() {
    keyWord.value = null
    await nextTick()
    searchedBooks.value = books.value
}

onBeforeMount(async () => {
    await getAllBooks()
    search()
})

</script>




<template>
    <div class="mb-3 p-3">
        <form @submit.prevent="search">
            <div class="row">

                <div class="col-5">
                    <input class="form-control" type="text" name="" id="" v-model="keyWord">
                </div>
                <div class="col-1 btn-group">
                    <button class="btn btn-success" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                    <button class="btn btn-danger" @click="clear"><i class="fa-solid fa-xmark"></i></button>
                </div>

            </div>
        </form>
    </div>
    <div v-if="!searchedBooks || searchedBooks.length < 1" class="mt-3">
        <h3>Không tìm thấy quyển sách nào</h3>
    </div>
    <div class="m-3 -p-3">
        <div v-for="book in searchedBooks">
            <BookCard :bookId="book._id" :title="book.title" :author="book.author" :price="book.price"
                :publisherName="book.publisherName" :categories="book.categoryName" :quantity="book.quantity" :bookID="book.bookID" :publicationYear="book.publicationYear"
                @deleteBook="deleteBook"></BookCard>
        </div>
    </div>
</template>