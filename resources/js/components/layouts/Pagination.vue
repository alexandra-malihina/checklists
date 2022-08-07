<template>
    <nav>
        <ul class="pagination">
            <li class="page-item" @click="setCurrentPage(--current_page ? current_page : 1)" >
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li
                class="page-item"
                v-for="(page, index) in pages"
                :key="index"
                @click="setCurrentPage(page)"
                :class="{ active: current_page === page }"
            >
                <a class="page-link" href="#">{{ page ? page : '...' }}</a>
            </li>

            <li class="page-item" @click="setCurrentPage(++current_page < last_page ? current_page : last_page)">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    name: "pagination",
    // props: ['last_page', 'current_page'],
    data() {
        return {
            pages: [1],
            current_page: 1,
            last_page: 1,
        };
    },
    methods: {
        setCurrentPage(current_page) {
            if (current_page === 0) {
               return false
            }
            if (current_page > this.last_page) {
                current_page = this.last_page;
            }
            this.current_page = current_page;
            this.$emit("set-page", current_page);
        },
        setPagination(current_page, last_page) {
            this.current_page = current_page;
            this.last_page = last_page;
            console.log("pp");
            this.pages = [];
            if (this.last_page <= 10) {
                for (let i = 1; i <= this.last_page; i++) {
                    this.pages.push(i);
                }
                return false;
            }

            this.pages.push(1);
            if (current_page - 1 <= 2) {
                for (let i = 2; i <= this.current_page + 1; i++) {
                    this.pages.push(i);
                }
                this.pages.push(0);
                this.pages.push(last_page);
                return false;
            }

            if (current_page + 1 >= last_page - 1) {
                this.pages.push(0);
                for (let i = current_page - 1; i <= this.last_page; i++) {
                    this.pages.push(i);
                }
                // this.pages.push(last_page)
                return false;
            }
            this.pages.push(0);
            for (let i = current_page - 1; i <= this.current_page + 1; i++) {
                this.pages.push(i);
            }
            this.pages.push(0);
            this.pages.push(last_page);
            return false;
        },
    },
    updated() {
        console.log("u");
    },
};
</script>
