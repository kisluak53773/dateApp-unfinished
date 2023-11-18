-- CreateTable
CREATE TABLE "_UserInterested" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserInterested_AB_unique" ON "_UserInterested"("A", "B");

-- CreateIndex
CREATE INDEX "_UserInterested_B_index" ON "_UserInterested"("B");

-- AddForeignKey
ALTER TABLE "_UserInterested" ADD CONSTRAINT "_UserInterested_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserInterested" ADD CONSTRAINT "_UserInterested_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
