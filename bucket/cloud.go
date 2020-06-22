package bucket

import (
	"io"
	"context"
	"time"
	"log"
	"errors"
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

func (b CloudBucket) RemoveFile(name string) error {
	return errors.New("RemoveFile not implemented")
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

	if err := wc.Close(); err != nil {
	        return err
	}

	return nil
}

func (b CloudBucket) ReadFile(name string) (io.Reader, error) {
	ctx := context.Background()
	bkt := b.handle

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	rc, err := bkt.Object(name).NewReader(ctx)
	if err != nil {
		return nil, err
	}
	
	return rc, nil
}