/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";

// Instantiate a new Pinecone client, which will automatically read the
// env vars: PINECONE_API_KEY and PINECONE_ENVIRONMENT which come from
// the Pinecone dashboard at https://app.pinecone.io

const pinecone = new Pinecone();

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

/**
 * Pinecone allows you to partition the records in an index into namespaces.
 * Queries and other operations are then limited to one namespace,
 * so different requests can search different subsets of your index.
 * Read more about namespaces here: https://docs.pinecone.io/guides/indexes/use-namespaces
 *
 * NOTE: If you have namespace enabled in your Pinecone index, you must provide the namespace when creating the PineconeStore.
 */

const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings(),
  { pineconeIndex }
);

/* Search the vector DB independently with metadata filters */

export const pineconeQuery = async (question, store) => {
    const results = await vectorStore.similaritySearch(question, 2);
    console.log(results);
    return results;
      
}
/*
  [
    Document {
      pageContent: 'pinecone is a vector db',
      metadata: { foo: 'bar' }
    }
  ]
*/