import { db } from "../config/db.js";
import { favoritesTable } from "../db/schema.js";
import { v4 as uuidv4 } from "uuid";
import { and, eq } from "drizzle-orm";

export const createFavoriteRecipe = async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFavorite = await db
      .insert(favoritesTable)
      .values({
        id: uuidv4(),
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
      })
      .returning();

    res.status(201).json({msg:"Successfully added!",favorite:newFavorite[0]});
  } catch (error) {
    console.log("Error adding favorite", error);
    res
      .status(500)
      .json({ error: "Something went wrong", msg: error.message || error });
  }
};

export const fetchFavoriteRecipe = async (req, res) => {
  try {
    const { userId } = req.params;

    const userFavorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));

    res.status(200).json(userFavorites);
  } catch (error) {
    console.log("Error fetching the favorites", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const deleteFavoriteRecipe = async (req, res) => {
    try {
        const { userId, recipeId } = req.params;
    
        await db
          .delete(favoritesTable)
          .where(
            and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, parseInt(recipeId)))
          );
    
        res.status(200).json({ message: "Favorite removed successfully" });
      } catch (error) {
        console.log("Error removing a favorite", error);
        res.status(500).json({ error: "Something went wrong" });
      }
};
