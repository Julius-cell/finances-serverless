import { Component, inject, input, output, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Category,
  CategoryService,
} from "../../../../services/category.service";

@Component({
  selector: "app-category-select",
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: "./category-select.component.html",
  styles: ``,
})
export class CategorySelectComponent {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);

  selected = signal<Category | null>(null);
  isOpen = signal(false);

  faAngleDown = faAngleDown;
  faPlus = faPlus;

  options = input<Category[]>([]);
  selectedChange = output<Category>();

  categoryForm = this.fb.group({
    newCategory: this.fb.control<string>(""),
  });

  constructor() {
    this.categoryService.getCategories().then((categories) => {
      this.options().push(...categories);
    });
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  async addNewCategory() {
    const newCategory = this.categoryForm.get("newCategory")?.value;
    if (newCategory) {
      const savedCategory = await this.categoryService.saveCategory({
        name: newCategory,
      });
      this.options().push(savedCategory);
      this.categoryForm.get("newCategory")?.setValue("");
      this.select(savedCategory);
    }
  }

  select(option: Category) {
    this.selected.set(option);
    this.selectedChange.emit(option);
    this.close();
  }

  close() {
    this.isOpen.set(false);
  }
}
