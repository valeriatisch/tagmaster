package bucket

import (
	"io"
	"context"
	"time"
	"log"
	"cloud.google.com/go/storage"
)

type CloudBucket struct {
	handle *storage.BucketHandle
}

func NewCloudBucket(name string) CloudBucket {
	ctx := context.Background()

	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatal(err)
	}

	bkt := client.Bucket(name)

	return CloudBucket {
		handle: bkt,
	}
}

func (b CloudBucket) WriteFile(name string, r io.Reader) error {
	ctx := context.Background()
	bkt := b.handle

	ctx, cancel := context.WithTimeout(ctx, time.Second*30)
	defer cancel()

	wc := bkt.Object(name).NewWriter(ctx)

	if _, err := io.Copy(wc, r); err != nil {
	        return err
	}

	return wc.Close()
}

func (b CloudBucket) RemoveFile(name string) error {
	ctx := context.Background()
	bkt := b.handle

	ctx, cancel := context.WithTimeout(ctx, time.Second*30)
	defer cancel()

	return bkt.Object(name).Delete(ctx)
}

func (b CloudBucket) ReadFile(name string) (io.Reader, error) {
	ctx := context.Background()
	bkt := b.handle

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	return bkt.Object(name).NewReader(ctx)
}