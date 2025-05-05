import { inject, Injectable } from "@angular/core";

import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "@angular/fire/firestore";
import { AuthService } from "../auth/auth.service";

export interface Category {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private firestore = inject(Firestore);
  private userCredential = inject(AuthService).userState();

  async saveCategory(category: Category): Promise<Category> {
    const categoryDate = new Date();
    const categoryId = `${categoryDate.getTime()}`;
    const categoryRef = doc(
      this.firestore,
      `users/${this.userCredential.data?.uid}/categories/${categoryId}`
    );

    await setDoc(categoryRef, {
      categoryId,
      name: category.name,
      userId: this.userCredential.data?.uid,
      createdAt: categoryDate,
    });

    return {
      id: categoryId,
      name: category.name,
    };
  }

  async getCategories(): Promise<Category[]> {
    const categoriesCollection = collection(
      this.firestore,
      `users/${this.userCredential.data?.uid}/categories`
    );

    const querySnapshot = await getDocs(categoriesCollection);

    const categories = querySnapshot.docs.map((doc) => ({
      name: doc.data()["name"],
      id: doc.id,
    }));

    return categories;
  }
}
